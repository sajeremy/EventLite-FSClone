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
        events and history. Unscripted. Collaborative. Always fresh.\n
  
        We depart from the Old Stone House with some public art in the
        playground before heading down towards the Gowanus Canal. The
        walk is between 1.5 and 2 hours, and ends near the Gowanus Dredgers Boathouse.\n
        
        Tickets often sell out, and cannot be purchased after 8am on the morning
        of the walk... so try early!\n
        
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
        category: 'adventure',
        organizer_id: 1,
        file: "https://eventlite-22-seeds.s3.amazonaws.com/image1.jpg",
        filename: "image1.jpg"
      },
      {
        title:'Art music',
        body: 'sample body 2',
        address: 'The Old Stone House 336 3rd St. Meet on 5th Ave. side of historic house Brooklyn, NY 11215',
        start_datetime: DateTime.parse("Sat, Dec 10, 2023, 11:30 AM EST"),
        end_datetime: DateTime.parse("Sat, Dec 10, 2023, 02:30 PM EST"),
        capacity: 3,
        ticket_price: 2.00,
        category: 'music',
        organizer_id: 1,
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
        title:'Show Event',
        body: 'sample body 3',
        address: 'The Old Stone House 336 3rd St. Meet on 5th Ave. side of historic house Brooklyn, NY 11215',
        start_datetime: DateTime.parse("Sat, Dec 10, 2022, 11:30 PM EST"),
        end_datetime: DateTime.parse("Sun, Dec 11, 2022, 02:30 AM EST"),
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
        start_datetime: DateTime.parse("Sun, Dec 11, 2022, 02:30 AM EST"),
        end_datetime: DateTime.parse("Sun, Dec 11, 2023, 02:30 PM EST"),
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
