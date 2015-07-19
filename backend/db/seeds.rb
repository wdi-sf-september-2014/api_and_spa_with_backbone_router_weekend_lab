# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create([
		{ first: "Kourosh", last: "Karimkhany", email: "kouroshk@gmail.com", password: "sajdhfkjhjkh34af#" },
		{ first: "Kristen", last: "Philipkoski", email: "kphilipk@gmail.com", password: "kjdAkjl42&^**&^" }
	])

Post.create([
		{ headline: "Earth is the Second-Best Planet", body: "Boolah, boolah, boolah, boolah.", public: true }
	])