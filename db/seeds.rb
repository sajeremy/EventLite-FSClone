ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
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
  
    puts "Done!"
  end
