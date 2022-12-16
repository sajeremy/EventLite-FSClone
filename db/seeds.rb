require 'open-uri'
# event = Event.create(params)
# file = URI.open('link')
# event.photo.attach(io: file, filename: 'jpg_image.png')


ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Event.destroy_all
    User.destroy_all
    Ticket.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('events')
    ApplicationRecord.connection.reset_pk_sequence!('tickets')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
        email: 'demo@io.com',
        password: 'password',
        first_name: 'Demo',
        last_name: 'User',
        street_address: '90 5th Ave',
        city: 'New York',
        state: 'NY',
        country:'United States',
        zipcode: '10011'
    )
  
    # More users
    10.times do 
      User.create!({
        email: Faker::Internet.unique.email,
        password: 'password',
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        street_address: Faker::Address.street_address,
        city: Faker::Address.city,
        state: Faker::Address.state_abbr,
        country:Faker::Address.country,
        zipcode: Faker::Address.zip_code
      }) 
    end

    events_list = [
      {
        title:'"STREET / ART Brooklyn" Gowanus Art Walk',
        body: 'Local collage artist Rich Garr leads this safe
        [masked, socially distant] open-air exploration through
        the Gowanus waterfront. He is a longtime area interdisciplinary
        artist focusing on public art and community. Every month plans
        this art-centric walking tour responding equally to both current
        events and history. Unscripted. Collaborative. Always fresh.
  
        We depart from the Old Stone House with some public art in the
        playground before heading down towards the Gowanus Canal. The
        walk is between 1.5 and 2 hours, and ends near the Gowanus Dredgers Boathouse.
        
        Tickets often sell out, and cannot be purchased after 8am on the morning
        of the walk... so try early!
        
        Revs, Guild, Captain Eyeliner and Billy Barnacles street art is often
        featured on the walk. So are historical landmarks, architectural gems,
        hidden art spaces, and art by anonymous "green guerillas" and renowned
        graffiti writers. While old pollution lingers, so do new issues
        surrounding gentrification and re-zoning. The area is changing rapidly,
        and this tour features real-time information & insight. This "socially
        distant" walk along the water passes historic businesses, hip new bars
        & cafes, and quirky art & recreational spaces (i.e. shuffleboard, climbing
        and ax throwing).',
        address: 'The Old Stone House 336 3rd St. Meet on 5th Ave. side of historic house Brooklyn, NY 11215',
        start_datetime: DateTime.parse("Sat, Dec 10, 2023, 11:30 AM EST"),
        end_datetime: DateTime.parse("Sat, Dec 10, 2023, 02:30 PM EST"),
        capacity: 5,
        ticket_price: 22.89,
        category: 'Hobbies',
        organizer_id: 1,
        file: "https://eventlite-22-seeds.s3.amazonaws.com/image1.jpg",
        filename: "image1.jpg"
      },
      {
        title:'2023 New York International Salsa Congress',
        body: "'The 2023 New York Salsa Congress! Enjoy nonstop dancing, live concerts, instructional workshops and bootcamps all weekend long! The New York International Salsa Congress is New York City's largest and longest-running Latin dance and music event where the world comes to dance no matter your style and/or age, whether you're a beginner or professional dancer.  
        Visit our website: www.newyorksalsacongress.com for schedules, artists, hotel, travel information and more!!'",
        address: 'Marquis Theatre 210 W 46th St, New York, NY',
        start_datetime: DateTime.parse("Sat, Aug 31, 2023, 05:00 PM EST"),
        end_datetime: DateTime.parse("Sun, Sep 03, 2023, 04:00 AM EST"),
        capacity: 100,
        ticket_price: 200.00,
        category: 'Hobbies',
        organizer_id: 1,
        file: "https://eventlite-22-seeds.s3.amazonaws.com/image15.jpg",
        filename: "image15.jpg"
      },
      {
        title:'Japanese Taiko "Thunder Drum" Workshop, Demo, & Jam Session',
        body: "'If you're walking around the neighborhood of South Williamsburg in Brooklyn, don't be startled if you hear loud drums in the distance. Instead, follow those bellowing sound waves down a nondescript alleyway to a hidden dojo ready to teach you a 1,500-year-old drumming art from Japan.
        Join New York Adventure Club for a private drumming workshop at Taiko Masala Dojo, a Brooklyn-based dojo dedicated to the art of Taiko, a traditional Japanese drumming and martial arts-inspired movement.
        Led by master drummer Hiro Kurashima, owner and founder of Taiko Masala, our unique musical experience will include:
        A brief history of the ancient Japanese art of Taiko as well as Hiro's Brooklyn dojo
        A walkthrough of the studio to see the dojo's arsenal of hand-made instruments, including small eight-inch hand-held drums, five-foot barrel drums, and the giant 250-pound O-daiko
        A one-hour lesson on the art of Taiko — you'll learn everything from a simple Taiko backbeat rhythm to simple melody pattern
        A jam session with your fellow Adventure Club Taiko orchestra members that incorporates your newly learned Taiko skills 
        Before the interactive lesson and jam session, we'll listen to a live musical demonstration by Taiko Masala Dojo's top students, some of which are in the Thunder Drumming Troupe — a professional Taiko drumming orchestra that travel the country performing at some of the nation's largest Japanese events and festivals.",
        address: 'The Old Stone House 336 3rd St. Meet on 5th Ave. side of historic house Brooklyn, NY 11215',
        start_datetime: DateTime.parse("Sat, January 21, 2023, 2:15 PM EST"),
        end_datetime: DateTime.parse("Sat, January 21, 2023, 3:30 PM EST"),
        capacity: 30,
        ticket_price: 43.69,
        category: 'Performing & Visual Arts',
        organizer_id: 1,
        file: "https://eventlite-22-seeds.s3.amazonaws.com/image2.jpg",
        filename: "image2.jpg"
      },
      {
        title:'I FEEL: Neon Utopia',
        body: 'Lovely Feelers!
        Get ready to Glow and Feel a UV light fantasy For our first I FEEL of 2023!
        Here you will find art installations, visual stimulations, magical music, state of the art sound, a massive industrial venue with a private backyard, and the most magical glowing creatures the universe has to offer!
        Doors will open at 10pm. We highly recommend arriving early to avoid lines. 
        Costumes Required!
        Transform yourself! Dress to glow creatively under the UV light!
        Feel your own neon fantasy and go Neon Tribal, glowing attire, Nomad Fluorescent style, neon flowers, light-up Toys and accessories, glow headdresses, neon tutus, fluorescent wigs, tribal uv masks... sky is the limit!',
        address: 'I FEEL 260 meserole street Brooklyn, NY 11206',
        start_datetime: DateTime.parse("Fri, Jan 20, 2023, 10:00 PM EST"),
        end_datetime: DateTime.parse("Sat, Jan 21, 2023, 5:00 AM EST"),
        capacity: 50,
        ticket_price: 28.79,
        category: 'Music',
        organizer_id: rand(User.all.length),
        file: "https://eventlite-22-seeds.s3.amazonaws.com/Image3.jpg",
        filename: "image3.jpg"
      },
      {
        title:'Tech and Startup Networking Mixer',
        body: "'Dev Talks presents: 

        Have you been attending virtual networking events in your basement? We weren't. What is virtual networking, anyways?
        
        NYC's best networking mixer in startup space. Calling all tech founders, SaaS founders, entrepreneurs, recruiters, free-lancers, startup mentors, coaches and engineers.
        
        Join us to connect with co-founders, coaches or new hires, or even if you would like to practice your elevator pitch. This is a no pressure event that brings in a lot of talent in tech and startup space, you would stand to benefit from the conversations and meaningful connections.
        
        - Bring your business cards
        
        - Name tags will be provided
        
        - Our events are in reserved space with conversational music, make the most of it
        
        - Dress code is business casual
        
        Disclaimer: By attending the events of Startup+ or Dev.Talks, you agree that the photos/videos taken during the event will be used for promotion of future events.'",
        address: '627 Lexington Ave New York, NY 10022',
        start_datetime: DateTime.parse("Thu, Jan 19, 2023, 5:00 PM EST"),
        end_datetime: DateTime.parse("Thu, Jan 19, 2023, 9:00 PM EST"),
        capacity: 20,
        ticket_price: 0.00,
        category: 'Business',
        organizer_id: rand(User.all.length),
        file: "https://eventlite-22-seeds.s3.amazonaws.com/image4.jpg",
        filename: "image4.jpg"
      },
      {
        title:'NYC Blockchain Network Meetup - at The Hugh',
        body: "Come as you are, if you are part of the growing blockchain sector or are simply interested or curious let’s unfold this unlimited potential together. On average 150+ passionate people just like you attend the event.
        Regular monthly meetings help to support relationship building, really getting to know people, and creating a lasting network effect in our community.
        Connections turn into relationships, ideas into innovations, and collaborations into transformative impact. This isn’t a one-time conference or event. Come as you are and experience passionate people, purposeful introductions, and unexpected opportunities.
        Blockchain and Cryptocurrencies are now one of the most talked-about innovations with the promise of disruptive innovations and new ways decentralization can help business, people, and society. To reach this potential we must collaborate to form a more equitable future.",
        address: 'The Hugh 601 Lexington Ave New York, NY 10022',
        start_datetime: DateTime.parse("Thu, Feb 16, 2023 5:00 PM EST"),
        end_datetime: DateTime.parse("Thu, Feb 16, 2023 9:00 PM EST"),
        capacity: 20,
        ticket_price: 0.00,
        category: 'Business',
        organizer_id: rand(User.all.length),
        file: "https://eventlite-22-seeds.s3.amazonaws.com/image5.jpg",
        filename: "image5.jpg"
      },
      {
        title:'SAN SEBASTIAN STREET FESTIVAL 2023',
        body: "'This decades-old art and culture fest is back to cap off Puerto Rico's Christmas season. Experience historic Old San Juan at its liveliest.'
        After a two-year hiatus, the storied San Sebastian Street Festival (Fiestas de la Calle San Sebastián, or simply, La SanSe) returns with more art, more culture, music, food… more of everything that makes this one of the most exciting celebrations in the Caribbean. During the multi-day celebrations, the historic city of Old San Juan comes alive with a renewed sense of vibrancy for the entire family: by day, revelers are treated to take in the works of local artisans and vendors; at night, the energy is turned up to 11 with live musical performances and dancing, as well as impromptu parties at every corner. Register to stay up to date on the event's roster of entertainment.",
        address: '148 Calle de San Sebastián San Juan, San Juan 00901 Puerto Rico',
        start_datetime: DateTime.parse("Thu, Jan 19, 2023, 12:00 AM EST"),
        end_datetime: DateTime.parse("Sun, Jan 23, 2023, 12:00AM EST"),
        capacity: 1000,
        ticket_price: 0.00,
        category: 'Holiday',
        organizer_id: rand(User.all.length),
        file: "https://eventlite-22-seeds.s3.amazonaws.com/image6.jpg",
        filename: "image6.jpg"
      },
      {
        title:'Mambo Mayhem: South Side Salsa',
        body: 'ECI Monday Mambo Mayhem: South Side Salsa 18+

        Free w/ RSVP
        
        Doors Open 7:00pm
        
        Dance Lesson 7:15pm
        
        Open Dancing 8:15pm
        
        Ends at 11pm
        
        Every 3rd Monday of the Month
        
        (Salsa | Bachata | Cha-Cha-Chá | Merengue | More)
        
        Dance Lesson by The Ballroom and Latin Dance Association (BDLA) of UChicago
        
        Music by El Caobo (WDCB 90.9 fm | WHPK 88.5 fm | WIIT 88.9 fm | Fania Records Official Salsa DJ)
        
        Performances TBD
        
        Presented by: El Caobo Internacional, WHPK International Format - 88.5 fm Chicago, & Ballroom and Latin Dance Association (BLDA)
        
        ',
        address: 'The Promontory 5311 South Lake Park Avenue West Chicago, IL 60615',
        start_datetime: DateTime.parse("Mon, December 19, 2022, 07:00 PM EST"),
        end_datetime: DateTime.parse("Tue, December 20, 2022, 02:00 AM EST"),
        capacity: 24,
        ticket_price: 12.50,
        category: 'Performing & Visual Arts',
        organizer_id: rand(User.all.length),
        file: "https://eventlite-22-seeds.s3.amazonaws.com/image7.jpg",
        filename: "image7.jpg"
      },
      {
        title:'Full Stack Clone Presentations',
        body: 'Students from App Academy will present their full stack apps to their peers to share what they have built and learned.',
        address: '90 5th Ave, New York, NY 10011',
        start_datetime: DateTime.parse("Fri, Dec 16, 2022, 09:00 AM EST"),
        end_datetime: DateTime.parse("Fri, Dec 16, 2022, 11:30 AM EST"),
        capacity: 50,
        ticket_price: 5.00,
        category: 'Business',
        organizer_id: rand(User.all.length),
        file: "https://eventlite-22-seeds.s3.amazonaws.com/image9.jpg",
        filename: "image9.jpg"
      },
      {
        title:'Yo! MTV Bingo - Alligator Lounge',
        body: 'Score a Rock N Roll Bingo and win vintage LPs, fabulous prizes, and free booze ! !

        Game 1 - Pop Diva Bingo
        
        Game 2 - Yo! MTV Bingo',
        address: 'Alligator Lounge 600 Metropolitan Avenue Brooklyn, NY 11211',
        start_datetime: DateTime.parse("Tue, December 27, 2022, 08:00 PM EST"),
        end_datetime: DateTime.parse("Tue, December 27, 2022, 11:00 PM EST"),
        capacity: 40,
        ticket_price: 10.00,
        category: 'Food & Drink',
        organizer_id: rand(User.all.length),
        file: "https://eventlite-22-seeds.s3.amazonaws.com/image10.jpg",
        filename: "image10.jpg"
      },
      {
        title:'Greatest of Axe Time Goat Yoga',
        body: 'Check-in begins promptly at 10:30 AM, followed shortly thereafter by 40 minutes of Vinyasa yoga with 4 of our lovely goats, then wrapping up with some time for you to learn goat facts, take pictures, and hang with our lovely goats. The hatchet throwing will begin at 11:30 AM and go for one hour.

        This is an indoor event but there will be plenty of room to social distance.
        
        Bring your own yoga mat and water source that has a cap!
        
        MUST BE AT LEAST 13 YEARS OLD TO PARTICIPATE IN BOTH THE GOAT YOGA AND HATCHET THROWING. 18 or younger must be accompanied by an adult.',
        address: "Stumpy's Hatchet House Upper Saddle River - Axe Throwing 107 Pleasant Avenue Upper Saddle River, NJ 07458",
        start_datetime: DateTime.parse("Sat, Feb 11, 2023, 10:30 AM EST"),
        end_datetime: DateTime.parse("Sat, Feb 11, 2023, 1:30 PM EST"),
        capacity: 20,
        ticket_price: 20.50,
        category: 'Health',
        organizer_id: rand(User.all.length),
        file: "https://eventlite-22-seeds.s3.amazonaws.com/image11.jpg",
        filename: "image11.jpg"
      },
      {
        title:'OPEN MIC NIGHT',
        body: "Our open mic night is open to anybody. Whether you want to sing, do some slam poetry, try out some new stand up comedy, tell a short story, play an instrument, or whatever fuels you creatively! This is the perfect community to share with. Even if you don't want to perform and just want to be a part of the fun! You can come solo, bring a friend, or a date. Our Open Mic night is the best way to get out, enjoy something new, and meet amazing people.

        We will be serving up wine, warm spiced hot chocolate, and tasty pastries!",
        address: '704 DeKalb Ave 704 DeKalb Avenue Brooklyn, NY 11216',
        start_datetime: DateTime.parse("Mon, Jan 16, 2023, 09:30 PM EST"),
        end_datetime: DateTime.parse("Mon, Jan 16, 2023, 11:30 PM EST"),
        capacity: 20,
        ticket_price: 15.00,
        category: 'Performing & Visual Arts',
        organizer_id: rand(User.all.length),
        file: "https://eventlite-22-seeds.s3.amazonaws.com/image13.jpg",
        filename: "image13.jpg"
      },
      {
        title:'Neurohacking 101: Analyzing and Visualizing Brain Networks',
        body: "Did you know you can learn a lot about the brain from as little as a half-hour in an MRI scanner? And that there are tens of thousands of brain scans publicly available on the internet? MRI has revolutionized the way we see the brain and mind, and it is advancing at an incredible speed. This introductory course covers some of the most important techniques used in the analysis of MRI data, and you'll learn plenty about neuroscience along the way!

        We'll start by going over some of the neuroscience fundamentals, and talk about how they apply to brain networks. You'll use Python, a powerful general-purpose open-source programming language. You'll get an introduction to working with powerful Python packages, including Nilearn, Nibabel, and Scikit Learn. You'll pull brain data from servers, and analyze and visualize the brain networks in these open source data on your own laptop!
        
        We encourage workshop participants to have some previous coding experience, but this is not required. The course will not spend much time on the basics of Python: rather, we will only do a brief review of basic Python commands before jumping in to specific neuroimaging packages.",
        address: 'Genspace 132 32nd Street #108 Brooklyn, NY 11232',
        start_datetime: DateTime.parse("Sat, Jan 28, 2023, 02:00 PM EST"),
        end_datetime: DateTime.parse("Sat, Jan 28, 2023, 05:00 PM EST"),
        capacity: 40,
        ticket_price: 115.00,
        category: 'Business',
        organizer_id: rand(User.all.length),
        file: "https://eventlite-22-seeds.s3.amazonaws.com/image14.jpg",
        filename: "image14.jpg"
      },

    ]

    events_list.each do |event|
      event_attributes = [:title, :body, :address, :start_datetime,:end_datetime, :capacity, :ticket_price, :category,:organizer_id]
      event_hash = {}

      event_attributes.each do |attr|
        event_hash[attr] = event[attr]
      end
      
      new_event = Event.create!(event_hash)
      file = URI.open(event[:file])
      new_event.photo.attach(io: file, filename: event[:filename])

    end

    Ticket.create!({events_id: 1, attendee_id: 1})
    Ticket.create!({events_id: 2, attendee_id: 1})
    Ticket.create!({events_id: 2, attendee_id: 2})
    Ticket.create!({events_id: 2, attendee_id: 3})
    Ticket.create!({events_id: 3, attendee_id: 3})

    puts "Done!"
  end



  # {
  #   title:'Restorative Yoga',
  #   body: 'Restorative yoga is a form of yoga that works with the sympathetic and parasympathetic system to help you go from the fight and flight mode to the rest and digest mode. It seeks to achieve physical, mental and emotional relaxation with the aid of props. The use of props makes it easier for you to maintain balance while you are stimulating, stretching and relaxing your body.(Pillows, blocks and blankets) This type of Yoga is designed to restore, rejuvenate and relax. Whether you are stressed or suffering depletion of energy, or if you simply need a deep stretch and better health, this yoga is the right one for you.',
  #   address: 'Absalom 223 Degraw Avenue Teaneck, NJ 07666',
  #   start_datetime: DateTime.parse("Wed, Jan 18, 2023, 09:30 AM EST"),
  #   end_datetime: DateTime.parse("Wed, Jan 18, 2023, 11:30 AM EST"),
  #   capacity: 20,
  #   ticket_price: 35.00,
  #   category: 'Health',
  #   organizer_id: rand(User.all.length),
  #   file: "https://eventlite-22-seeds.s3.amazonaws.com/image12.jpg",
  #   filename: "image12.jpg"
  # },
