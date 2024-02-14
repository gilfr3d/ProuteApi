import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const cookies = req.cookies;
  // console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
  const { email, password } = req.body;

  try {
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });

    const foundUser = await prisma.users.findFirst({
      where: {
        email: email,
      },

    });

    if (!foundUser) return res.sendStatus(401); // Unauthorized

    // Evaluate password
    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
      // Determine the user's role
      const role = foundUser.role || 'User'; // Replace 'USER' with your default role

      // Create JWTs
      const accessToken = jwt.sign(
        {
          UserInfo: {
            userId: foundUser.id,
            email: foundUser.email,
            roles: [role], // Include the user's role
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1m' }
      );

      const newRefreshToken = jwt.sign({ userId: foundUser.id, email: foundUser.email }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d',
      });

      let newRefreshTokenArray =
        !foundUser.refreshTokens ? [] : foundUser.refreshTokens.filter(rt => rt !== cookies?.jwt);

      if (cookies?.jwt) {
        const refreshToken = cookies.jwt;
        const foundToken = await prisma.users.findFirst({
          where: {
            refreshTokens: {
              some: {
                token: refreshToken,
              },
            },
          },
        });

        if (!foundToken) {
          console.log('Attempted refresh token reuse at login!');
          // clear out ALL previous refresh tokens
          newRefreshTokenArray = [];
        }

        // res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // for production httpOnly: true
        res.clearCookie('jwt', { sameSite: 'None', secure: true }); // for dev only
      }

      // Saving refreshToken with the current user
      const result = await prisma.users.update({
        where: {
          id: foundUser.id,
        },
        data: {
          refreshTokens: {
            create: {
              token: newRefreshToken,
            },
          },
        },
      });

      console.log(result);

      // Creates Secure Cookie with a refresh token
      res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

      res.json({ accessToken, role }); // Include the user's role in the response
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error('Error handling login:', error);
    res.sendStatus(500); // Internal Server Error
  }
};

export const refresh = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const foundUser = await prisma.users.findFirst({
      where: {
        refreshTokens: {
          some: {
            token: refreshToken,
          },
        },
      },
    });

    if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          userId: foundUser.id,
          email: foundUser.email,
          roles: foundUser.role ? [foundUser.role] : [], // Include the user's role
          // permissions: foundUser.permissions.map((permission) => permission.name),
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10m' } // => make shorter for prod
    );

    res.json({ accessToken });
  } catch (error) {
    // console.error('Error handling token refresh:', error);
    res.status(403).json({ message: 'Forbidden' });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not registered" });
    }

    // Omit sensitive information before sending the response
    const { password, refreshTokens, ...userInfo } = user;

    res.json(userInfo);
  } catch (error) {
    console.error('Error fetching user details:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};


export const invalidatedTokens = [];

export const logoutUser = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); // No content

  const refreshToken = cookies.jwt;

  try {
    // Find the user with the matching refresh token
    const foundUser = await prisma.users.findFirst({
      where: {
        refreshTokens: {
          some: {
            token: refreshToken,
          },
        },
      },
    });

    if (foundUser) {
      // Remove the refresh token associated with the user
      await prisma.users.update({
        where: {
          id: foundUser.id,
        },
        data: {
          refreshTokens: {
            deleteMany: {
              token: refreshToken,
            },
          },
        },
      });

      invalidatedTokens.push(refreshToken)
      console.log('Token added to invalidatedTokens array.');
    }

    // Clear the JWT cookie on the client side
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.json({ message: 'Cookie cleared' });
  } catch (error) {
    console.error('Error handling logout:', error);
    res.sendStatus(500); // Internal Server Error
  }
};


