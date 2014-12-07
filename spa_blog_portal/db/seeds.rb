# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create([
  { first: "Sandi", last: "Mamacita", email: "sandimamacita@happy.com", password: "passowrd"},
  { first: "Angel", last: "Pooopooface", email: "angel@happy.com", password: "passowrd"}
  ])

Post.create([
  { title: "Meditation is good medicine!", body: "Meditation for 20 minutes a day, 8 weeks, can have affects on your brain-- it can increase gray matter in your brain!" },
  { title: "Tango Dancing and Acro Yoga", body: "Oxytocin release, affection, playfulness, non-sexual touch-- all helps to lower stress and anxiety!"  }
])

User.first.posts << Post.first
User.last.posts << Post.last
