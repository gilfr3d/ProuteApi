import prisma from '../config/db.js';

export const createCustomers = async (req, res) => {
    const dummyCustomers = [
        {
          "name": "Erastus Piechnik",
          "email": "epiechnik0@alibaba.com",
          "mobile": "700-114-4803",
          "address": "63101 Miller Point",
          "shipping_address": "898 Magdeline Crossing"
        },
        {
          "name": "Geno Worsnop",
          "email": "gworsnop1@timesonline.co.uk",
          "mobile": "494-308-4405",
          "address": "94 Fremont Alley",
          "shipping_address": "02169 Hanover Drive"
        },
        {
          "name": "Gabriele Stollmeier",
          "email": "gstollmeier2@hhs.gov",
          "mobile": "303-856-8820",
          "address": "58501 Loeprich Road",
          "shipping_address": "320 Brown Hill"
        },
        {
          "name": "Leeanne Goutcher",
          "email": "lgoutcher3@odnoklassniki.ru",
          "mobile": "125-131-7785",
          "address": "25 Gulseth Crossing",
          "shipping_address": "2640 Hoepker Way"
        },
        {
          "name": "Sissy Ravenshaw",
          "email": "sravenshaw4@wired.com",
          "mobile": "794-398-0158",
          "address": "60242 Farragut Point",
          "shipping_address": "1645 Forest Way"
        },
        {
          "name": "Corey Roft",
          "email": "croft5@meetup.com",
          "mobile": "352-773-7341",
          "address": "2663 Independence Center",
          "shipping_address": "8 Center Crossing"
        },
        {
          "name": "Marcos Frape",
          "email": "mfrape6@apple.com",
          "mobile": "561-975-2986",
          "address": "17945 Montana Lane",
          "shipping_address": "7 Judy Pass"
        },
        {
          "name": "Dahlia Vass",
          "email": "dvass7@bluehost.com",
          "mobile": "886-947-7646",
          "address": "25 Killdeer Street",
          "shipping_address": "32 Lakewood Place"
        },
        {
          "name": "Ursula Tammadge",
          "email": "utammadge8@auda.org.au",
          "mobile": "678-158-1841",
          "address": "612 Springs Center",
          "shipping_address": "37219 Rusk Park"
        },
        {
          "name": "Bess Inworth",
          "email": "binworth9@nsw.gov.au",
          "mobile": "185-390-0303",
          "address": "0 Morning Lane",
          "shipping_address": "889 Fallview Circle"
        },
        {
          "name": "Ganny Humerstone",
          "email": "ghumerstonea@deviantart.com",
          "mobile": "812-398-1220",
          "address": "4 Maywood Street",
          "shipping_address": "07 Luster Junction"
        },
        {
          "name": "Kathleen Reisk",
          "email": "kreiskb@cbslocal.com",
          "mobile": "217-565-7542",
          "address": "3410 Briar Crest Road",
          "shipping_address": "1 Novick Trail"
        },
        {
          "name": "Hadleigh Leacock",
          "email": "hleacockc@delicious.com",
          "mobile": "954-417-6723",
          "address": "127 Tennyson Court",
          "shipping_address": "5181 Talisman Place"
        },
        {
          "name": "Beth Ferens",
          "email": "bferensd@t-online.de",
          "mobile": "658-521-9102",
          "address": "71496 Moulton Avenue",
          "shipping_address": "70250 Banding Place"
        },
        {
          "name": "Katie Belz",
          "email": "kbelze@icio.us",
          "mobile": "380-266-5351",
          "address": "09833 Morning Pass",
          "shipping_address": "843 Lake View Lane"
        },
        {
          "name": "Gilly Thonason",
          "email": "gthonasonf@cyberchimps.com",
          "mobile": "158-384-5074",
          "address": "18 Anniversary Road",
          "shipping_address": "739 Monterey Point"
        },
        {
          "name": "Clari Tumayan",
          "email": "ctumayang@angelfire.com",
          "mobile": "100-587-8423",
          "address": "1 Basil Street",
          "shipping_address": "0598 Lyons Court"
        },
        {
          "name": "Konrad Btham",
          "email": "kbthamh@accuweather.com",
          "mobile": "321-928-0985",
          "address": "123 Nevada Crossing",
          "shipping_address": "667 Old Shore Road"
        },
        {
          "name": "Bobbi Keppy",
          "email": "bkeppyi@ifeng.com",
          "mobile": "180-936-0626",
          "address": "6257 Caliangt Drive",
          "shipping_address": "46 Scott Terrace"
        },
        {
          "name": "Daphna Millin",
          "email": "dmillinj@imageshack.us",
          "mobile": "481-357-2026",
          "address": "7 Bowman Hill",
          "shipping_address": "3 Eagle Crest Place"
        },
        {
          "name": "King Bartkiewicz",
          "email": "kbartkiewiczk@google.com.br",
          "mobile": "582-346-0027",
          "address": "9871 Butternut Park",
          "shipping_address": "5224 Nelson Center"
        },
        {
          "name": "Cherilyn Ackroyd",
          "email": "cackroydl@cisco.com",
          "mobile": "402-795-1005",
          "address": "874 Becker Alley",
          "shipping_address": "61350 4th Center"
        },
        {
          "name": "Aloise Klesl",
          "email": "akleslm@msn.com",
          "mobile": "414-725-8856",
          "address": "3 Straubel Park",
          "shipping_address": "8044 Elgar Drive"
        },
        {
          "name": "Hulda Nail",
          "email": "hnailn@prnewswire.com",
          "mobile": "137-158-2306",
          "address": "19 Dorton Plaza",
          "shipping_address": "362 Corry Road"
        },
        {
          "name": "Gracia Barbe",
          "email": "gbarbeo@rediff.com",
          "mobile": "560-991-5607",
          "address": "04 Delaware Junction",
          "shipping_address": "506 Sutteridge Road"
        },
        {
          "name": "Tiebout Cuzen",
          "email": "tcuzenp@geocities.jp",
          "mobile": "149-508-5621",
          "address": "7647 Harbort Street",
          "shipping_address": "2020 Lindbergh Alley"
        },
        {
          "name": "Ethelin Bartalini",
          "email": "ebartaliniq@sitemeter.com",
          "mobile": "499-470-7819",
          "address": "091 Prairie Rose Hill",
          "shipping_address": "71164 Waxwing Court"
        },
        {
          "name": "Chiquita Hurt",
          "email": "churtr@google.com.br",
          "mobile": "235-569-2778",
          "address": "047 Hooker Trail",
          "shipping_address": "4 Scofield Court"
        },
        {
          "name": "Nancey Jahn",
          "email": "njahns@princeton.edu",
          "mobile": "752-546-6400",
          "address": "3 Ridge Oak Park",
          "shipping_address": "911 Cottonwood Drive"
        },
        {
          "name": "Marlane Ingerson",
          "email": "mingersont@storify.com",
          "mobile": "608-647-5986",
          "address": "6 Alpine Junction",
          "shipping_address": "711 Maple Terrace"
        },
        {
          "name": "Spenser Pampling",
          "email": "spamplingu@mit.edu",
          "mobile": "124-645-2046",
          "address": "4757 Arapahoe Street",
          "shipping_address": "69 Blaine Point"
        },
        {
          "name": "De witt Cockings",
          "email": "dwittv@moonfruit.com",
          "mobile": "789-607-2891",
          "address": "0216 Hoard Alley",
          "shipping_address": "9045 Mariners Cove Terrace"
        },
        {
          "name": "Lotti Patrick",
          "email": "lpatrickw@bigcartel.com",
          "mobile": "142-410-4302",
          "address": "93318 West Hill",
          "shipping_address": "74304 Orin Terrace"
        },
        {
          "name": "Letitia Shand",
          "email": "lshandx@ucoz.ru",
          "mobile": "631-458-7770",
          "address": "0537 Dunning Court",
          "shipping_address": "779 Haas Plaza"
        },
        {
          "name": "Cathie Clampe",
          "email": "cclampey@cisco.com",
          "mobile": "203-887-4041",
          "address": "55938 Shopko Terrace",
          "shipping_address": "5 Becker Court"
        },
        {
          "name": "Royce Pharrow",
          "email": "rpharrowz@cornell.edu",
          "mobile": "177-266-7536",
          "address": "8333 Oakridge Street",
          "shipping_address": "1 Corry Road"
        },
        {
          "name": "Cyrill Sambrok",
          "email": "csambrok10@timesonline.co.uk",
          "mobile": "129-705-0223",
          "address": "60083 Pearson Point",
          "shipping_address": "6 Laurel Center"
        },
        {
          "name": "Cyndie Robion",
          "email": "crobion11@ca.gov",
          "mobile": "305-818-8168",
          "address": "5234 Messerschmidt Crossing",
          "shipping_address": "3591 Ridgeway Lane"
        },
        {
          "name": "Alberta Ohanessian",
          "email": "aohanessian12@furl.net",
          "mobile": "150-668-5541",
          "address": "4167 Old Shore Drive",
          "shipping_address": "3264 Sauthoff Pass"
        },
        {
          "name": "Marcel Nannetti",
          "email": "mnannetti13@ibm.com",
          "mobile": "554-433-1590",
          "address": "026 Nelson Pass",
          "shipping_address": "55035 Harper Place"
        },
        {
          "name": "Nonnah Kahane",
          "email": "nkahane14@newyorker.com",
          "mobile": "435-370-1836",
          "address": "50706 Westport Crossing",
          "shipping_address": "497 Quincy Junction"
        },
        {
          "name": "Lovell Nowakowski",
          "email": "lnowakowski15@shop-pro.jp",
          "mobile": "746-570-2363",
          "address": "7806 Old Gate Court",
          "shipping_address": "7348 Barnett Street"
        },
        {
          "name": "Roddy Minton",
          "email": "rminton16@people.com.cn",
          "mobile": "570-538-0760",
          "address": "2 Roxbury Place",
          "shipping_address": "250 Banding Alley"
        },
        {
          "name": "Cristin Gellion",
          "email": "cgellion17@opensource.org",
          "mobile": "465-844-1567",
          "address": "4667 Trailsway Court",
          "shipping_address": "336 Buell Trail"
        },
        {
          "name": "Georgeta Flanagan",
          "email": "gflanagan18@constantcontact.com",
          "mobile": "954-887-6121",
          "address": "683 Main Street",
          "shipping_address": "189 Village Park"
        },
        {
          "name": "Guillema Waadenburg",
          "email": "gwaadenburg19@whitehouse.gov",
          "mobile": "408-105-3145",
          "address": "32 Vermont Street",
          "shipping_address": "572 Dovetail Plaza"
        },
        {
          "name": "Faina Ianne",
          "email": "fianne1a@wordpress.org",
          "mobile": "353-269-5863",
          "address": "3725 Golf Hill",
          "shipping_address": "12950 Red Cloud Place"
        },
        {
          "name": "Madelin MacArthur",
          "email": "mmacarthur1b@ucoz.ru",
          "mobile": "944-886-6598",
          "address": "021 Sage Drive",
          "shipping_address": "81 Warbler Avenue"
        },
        {
          "name": "Aldwin Rambaut",
          "email": "arambaut1c@freewebs.com",
          "mobile": "149-340-9232",
          "address": "41 Eastwood Park",
          "shipping_address": "4564 Schmedeman Circle"
        },
        {
          "name": "Shaine Ornelas",
          "email": "sornelas1d@over-blog.com",
          "mobile": "936-900-8261",
          "address": "3080 Pond Alley",
          "shipping_address": "2319 Bultman Crossing"
        },
        {
          "name": "Celestyna Clemerson",
          "email": "cclemerson1e@flavors.me",
          "mobile": "953-144-5328",
          "address": "6926 Glendale Alley",
          "shipping_address": "9026 Cottonwood Point"
        },
        {
          "name": "Randolf Elintune",
          "email": "relintune1f@umn.edu",
          "mobile": "798-813-5016",
          "address": "399 Oak Point",
          "shipping_address": "52 Gulseth Avenue"
        },
        {
          "name": "Kriste Braunstein",
          "email": "kbraunstein1g@buzzfeed.com",
          "mobile": "640-865-3467",
          "address": "9289 Brown Street",
          "shipping_address": "18170 Anniversary Pass"
        },
        {
          "name": "Tandi Dumingo",
          "email": "tdumingo1h@msn.com",
          "mobile": "653-947-2774",
          "address": "3 Mallory Pass",
          "shipping_address": "73 Lake View Lane"
        },
        {
          "name": "Truda Bonellie",
          "email": "tbonellie1i@twitter.com",
          "mobile": "524-939-2118",
          "address": "3724 Dayton Street",
          "shipping_address": "3690 Cardinal Alley"
        },
        {
          "name": "Martica Hearse",
          "email": "mhearse1j@usatoday.com",
          "mobile": "682-326-2738",
          "address": "498 Helena Point",
          "shipping_address": "22862 Hoepker Avenue"
        },
        {
          "name": "Hewet Fedoronko",
          "email": "hfedoronko1k@miitbeian.gov.cn",
          "mobile": "556-774-4708",
          "address": "726 Warrior Court",
          "shipping_address": "00244 Nevada Avenue"
        },
        {
          "name": "Florella Harkus",
          "email": "fharkus1l@youtu.be",
          "mobile": "889-172-7888",
          "address": "77191 Summer Ridge Junction",
          "shipping_address": "135 Roxbury Circle"
        },
        {
          "name": "Quint Pagan",
          "email": "qpagan1m@businesswire.com",
          "mobile": "217-832-9254",
          "address": "6162 Twin Pines Parkway",
          "shipping_address": "6142 Anhalt Lane"
        },
        {
          "name": "Dorri Doge",
          "email": "ddoge1n@arstechnica.com",
          "mobile": "187-164-7549",
          "address": "013 Oakridge Lane",
          "shipping_address": "30 Garrison Park"
        },
        {
          "name": "Oralee Tizard",
          "email": "otizard1o@a8.net",
          "mobile": "902-100-8298",
          "address": "30857 Cherokee Street",
          "shipping_address": "7 Mcguire Crossing"
        },
        {
          "name": "Pearce Copcott",
          "email": "pcopcott1p@wikispaces.com",
          "mobile": "493-580-5702",
          "address": "1135 Maywood Junction",
          "shipping_address": "0642 Ohio Place"
        },
        {
          "name": "Wain Sunnex",
          "email": "wsunnex1q@clickbank.net",
          "mobile": "171-458-2887",
          "address": "8259 Dryden Hill",
          "shipping_address": "80588 Crowley Road"
        },
        {
          "name": "Mariejeanne Sorsbie",
          "email": "msorsbie1r@usnews.com",
          "mobile": "468-242-7293",
          "address": "95 Waxwing Terrace",
          "shipping_address": "7 Monument Way"
        },
        {
          "name": "Dasi Jarnell",
          "email": "djarnell1s@mapquest.com",
          "mobile": "587-522-2620",
          "address": "38333 Hallows Place",
          "shipping_address": "555 Kropf Hill"
        },
        {
          "name": "Kara-lynn Stillmann",
          "email": "kstillmann1t@umn.edu",
          "mobile": "729-689-8829",
          "address": "783 Upham Parkway",
          "shipping_address": "28 Kipling Way"
        },
        {
          "name": "Tedmund Petett",
          "email": "tpetett1u@google.it",
          "mobile": "848-205-5041",
          "address": "9016 Hermina Hill",
          "shipping_address": "4 New Castle Trail"
        },
        {
          "name": "Madelyn Ruston",
          "email": "mruston1v@indiegogo.com",
          "mobile": "194-241-8476",
          "address": "91682 Carioca Drive",
          "shipping_address": "06 Dakota Hill"
        },
        {
          "name": "Ameline Linnitt",
          "email": "alinnitt1w@bloglines.com",
          "mobile": "610-449-6749",
          "address": "057 Brown Plaza",
          "shipping_address": "11670 Jenifer Court"
        },
        {
          "name": "Manon Pavitt",
          "email": "mpavitt1x@ed.gov",
          "mobile": "903-713-4493",
          "address": "8 Porter Center",
          "shipping_address": "84752 Grayhawk Way"
        },
        {
          "name": "Karrah Rayner",
          "email": "krayner1y@paginegialle.it",
          "mobile": "615-180-0092",
          "address": "898 Wayridge Avenue",
          "shipping_address": "6 Graceland Terrace"
        },
        {
          "name": "Patsy Farry",
          "email": "pfarry1z@weather.com",
          "mobile": "151-235-4802",
          "address": "2943 Maple Crossing",
          "shipping_address": "90 Cottonwood Trail"
        },
        {
          "name": "Melva Gerssam",
          "email": "mgerssam20@desdev.cn",
          "mobile": "130-285-0550",
          "address": "587 Fremont Street",
          "shipping_address": "00150 American Ash Crossing"
        },
        {
          "name": "Patten Matchett",
          "email": "pmatchett21@archive.org",
          "mobile": "225-558-7943",
          "address": "81 Hollow Ridge Pass",
          "shipping_address": "3 Vahlen Center"
        },
        {
          "name": "Ingunna Antonat",
          "email": "iantonat22@tmall.com",
          "mobile": "245-955-9297",
          "address": "14 Linden Hill",
          "shipping_address": "0 Nobel Junction"
        },
        {
          "name": "Eve Baudone",
          "email": "ebaudone23@surveymonkey.com",
          "mobile": "544-443-4072",
          "address": "53 Summerview Avenue",
          "shipping_address": "25 Myrtle Way"
        },
        {
          "name": "Adorne Milmo",
          "email": "amilmo24@google.it",
          "mobile": "995-823-1275",
          "address": "97 Prentice Crossing",
          "shipping_address": "2677 Heath Plaza"
        },
        {
          "name": "Brantley Beckingham",
          "email": "bbeckingham25@google.ca",
          "mobile": "322-648-2060",
          "address": "77734 Westridge Trail",
          "shipping_address": "7 Sachtjen Street"
        },
        {
          "name": "Sidnee Glawsop",
          "email": "sglawsop26@umn.edu",
          "mobile": "702-226-7091",
          "address": "8201 Rusk Park",
          "shipping_address": "00709 Anhalt Center"
        },
        {
          "name": "Anatollo Fury",
          "email": "afury27@dagondesign.com",
          "mobile": "480-712-8282",
          "address": "879 Nevada Drive",
          "shipping_address": "67 Forest Dale Avenue"
        },
        {
          "name": "Fernanda Aulton",
          "email": "faulton28@addtoany.com",
          "mobile": "960-919-4824",
          "address": "13513 Sauthoff Park",
          "shipping_address": "308 Debs Court"
        },
        {
          "name": "Mirelle Dongall",
          "email": "mdongall29@amazon.co.uk",
          "mobile": "713-818-3388",
          "address": "45978 Summerview Pass",
          "shipping_address": "97 Heath Road"
        },
        {
          "name": "Francois Rodder",
          "email": "frodder2a@ted.com",
          "mobile": "448-710-0120",
          "address": "0 School Parkway",
          "shipping_address": "997 Briar Crest Court"
        },
        {
          "name": "Franchot Gromley",
          "email": "fgromley2b@t-online.de",
          "mobile": "101-376-4145",
          "address": "5529 Elmside Point",
          "shipping_address": "644 Mayer Alley"
        },
        {
          "name": "Yovonnda Ribeiro",
          "email": "yribeiro2c@bbb.org",
          "mobile": "698-188-2350",
          "address": "86640 Independence Drive",
          "shipping_address": "5 Old Shore Road"
        },
        {
          "name": "Anya Niesegen",
          "email": "aniesegen2d@google.com.au",
          "mobile": "430-942-9491",
          "address": "5892 Heath Avenue",
          "shipping_address": "3007 Jay Court"
        },
        {
          "name": "Lind De Luna",
          "email": "lde2e@kickstarter.com",
          "mobile": "380-532-4710",
          "address": "52066 Fairview Road",
          "shipping_address": "008 Pearson Avenue"
        },
        {
          "name": "Camala Aguirre",
          "email": "caguirre2f@51.la",
          "mobile": "843-785-0393",
          "address": "4527 Welch Point",
          "shipping_address": "12351 Kim Park"
        },
        {
          "name": "Krystyna Gilley",
          "email": "kgilley2g@gizmodo.com",
          "mobile": "939-143-6744",
          "address": "0 Amoth Trail",
          "shipping_address": "7428 Sullivan Street"
        },
        {
          "name": "Kizzee Linneman",
          "email": "klinneman2h@dailymail.co.uk",
          "mobile": "540-437-3972",
          "address": "036 Killdeer Drive",
          "shipping_address": "7 Heffernan Road"
        },
        {
          "name": "Nicolai Joubert",
          "email": "njoubert2i@cmu.edu",
          "mobile": "660-336-7026",
          "address": "49962 Swallow Alley",
          "shipping_address": "6092 Bluejay Court"
        },
        {
          "name": "Kellen Goodban",
          "email": "kgoodban2j@chronoengine.com",
          "mobile": "796-134-3243",
          "address": "2 Welch Junction",
          "shipping_address": "9480 Johnson Circle"
        },
        {
          "name": "Ransell Fulstow",
          "email": "rfulstow2k@google.com.br",
          "mobile": "189-749-2103",
          "address": "48 Redwing Street",
          "shipping_address": "52101 Sutherland Lane"
        },
        {
          "name": "Koenraad Gilvary",
          "email": "kgilvary2l@wiley.com",
          "mobile": "477-809-5647",
          "address": "8 Forest Way",
          "shipping_address": "659 Melby Road"
        },
        {
          "name": "Ashlen Coltart",
          "email": "acoltart2m@com.com",
          "mobile": "558-206-0862",
          "address": "9 Kim Circle",
          "shipping_address": "58149 Center Plaza"
        },
        {
          "name": "Marina Lyster",
          "email": "mlyster2n@google.co.uk",
          "mobile": "739-122-4750",
          "address": "2608 Warrior Alley",
          "shipping_address": "4 Main Alley"
        },
        {
          "name": "Harwell Able",
          "email": "hable2o@desdev.cn",
          "mobile": "295-484-2858",
          "address": "01 Truax Parkway",
          "shipping_address": "4880 Stoughton Lane"
        },
        {
          "name": "Nathan Steagall",
          "email": "nsteagall2p@paypal.com",
          "mobile": "936-128-2915",
          "address": "363 Menomonie Parkway",
          "shipping_address": "461 Jackson Avenue"
        },
        {
          "name": "Hadlee Box",
          "email": "hbox2q@twitpic.com",
          "mobile": "611-172-5544",
          "address": "45 Lake View Drive",
          "shipping_address": "7 Memorial Hill"
        },
        {
          "name": "Thorny Marquet",
          "email": "tmarquet2r@sakura.ne.jp",
          "mobile": "805-997-1420",
          "address": "495 Sycamore Street",
          "shipping_address": "56 Northridge Court"
        }
      ]
      
    try {
      const createdCustomers = await prisma.customers.createMany({
        data: dummyCustomers,
      });
  
      return res.json({
        success: true,
        message: 'Dummy customer inserted successfully.',
        data: createdCustomers,
      });
    } catch (error) {
      console.error('Error inserting dummy orders:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  };