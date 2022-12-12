require 'open-uri'
# event = Event.create(params)
# file = URI.open('link')
# event.photo.attach(io: file, filename: 'jpg_image.png')


ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Event.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('events')
  
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
        file: "https://eventlite-22-seeds.s3.amazonaws.com/image7.jpg",
        filename: "image7.jpg"
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
        organizer_id: 2,
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
        organizer_id: 3,
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
        organizer_id: 4,
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
        organizer_id: 5,
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
        ticket_price: 20.50,
        category: 'Holiday',
        organizer_id: 6,
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
        start_datetime: DateTime.parse("Mon, December 19, 2022, 7:00 PM CST"),
        end_datetime: DateTime.parse("Mon, December 20, 2022, 2:00 AM CST"),
        capacity: 24,
        ticket_price: 20.50,
        category: 'Performing & Visual Arts',
        organizer_id: 7,
        file: "https://eventlite-22-seeds.s3.amazonaws.com/image7.jpg",
        filename: "image7.jpg"
      },
      {
        title:'Dance Event',
        body: 'sample body 3',
        address: 'The Old Stone House 336 3rd St. Meet on 5th Ave. side of historic house Brooklyn, NY 11215',
        start_datetime: DateTime.parse("Sat, Dec 10, 2023, 11:30 AM EST"),
        end_datetime: DateTime.parse("Sat, Dec 10, 2023, 02:30 PM EST"),
        capacity: 20,
        ticket_price: 20.50,
        category: 'dance',
        organizer_id: 8,
        file: "https://eventlite-22-seeds.s3.amazonaws.com/image1.jpg",
        filename: "image1.jpg"
      },
      {
        title:'Dance Event',
        body: 'sample body 3',
        address: 'The Old Stone House 336 3rd St. Meet on 5th Ave. side of historic house Brooklyn, NY 11215',
        start_datetime: DateTime.parse("Sat, Dec 10, 2023, 11:30 AM EST"),
        end_datetime: DateTime.parse("Sat, Dec 10, 2023, 02:30 PM EST"),
        capacity: 20,
        ticket_price: 20.50,
        category: 'dance',
        organizer_id: 2,
        file: "https://eventlite-22-seeds.s3.amazonaws.com/image1.jpg",
        filename: "image1.jpg"
      },
      {
        title:'Dance Event',
        body: 'sample body 3',
        address: 'The Old Stone House 336 3rd St. Meet on 5th Ave. side of historic house Brooklyn, NY 11215',
        start_datetime: DateTime.parse("Sat, Dec 10, 2023, 11:30 AM EST"),
        end_datetime: DateTime.parse("Sat, Dec 10, 2023, 02:30 PM EST"),
        capacity: 20,
        ticket_price: 20.50,
        category: 'dance',
        organizer_id: 2,
        file: "https://eventlite-22-seeds.s3.amazonaws.com/image1.jpg",
        filename: "image1.jpg"
      },
      {
        title:'Dance Event',
        body: 'sample body 3',
        address: 'The Old Stone House 336 3rd St. Meet on 5th Ave. side of historic house Brooklyn, NY 11215',
        start_datetime: DateTime.parse("Sat, Dec 10, 2023, 11:30 AM EST"),
        end_datetime: DateTime.parse("Sat, Dec 10, 2023, 02:30 PM EST"),
        capacity: 20,
        ticket_price: 20.50,
        category: 'dance',
        organizer_id: 2,
        file: "https://eventlite-22-seeds.s3.amazonaws.com/image1.jpg",
        filename: "image1.jpg"
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


  
    puts "Done!"
  end
