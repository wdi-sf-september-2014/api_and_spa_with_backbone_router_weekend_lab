# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create({first: "John", last: "Doe", email: "user1@gmail.com", password: "password"})
User.create({first: "Jane", last: "Doe", email: "user2@gmail.com", password: "password"})
User.create({first: "Joe", last: "Testa", email: "user3@gmail.com", password: "password"})

Post.create({title: "post 1", content: "first post", user_id: 1})
Post.create({title: "post 2", content: "second post", user_id: 2})
Post.create({title: "post 3", content: "third post", user_id: 3})