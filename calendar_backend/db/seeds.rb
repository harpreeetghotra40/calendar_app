# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

Event.destroy_all
Calendar.destroy_all
User.destroy_all

User.first_or_create!(
  name: 'FirstUser',
  email: 'firstUser@icloud.com',
  password_digest: 'what'
)

Calendar.first_or_create!(user_id: User.first.id)

Event.create!(
  title: 'Feelings',
  description: 'Don\'t Forget to Drink!!',
  event_time: DateTime.now + 1,
  calendar_id: Calendar.first.id
)
Event.create!(
  title: 'Feelings1',
  description: '1Don\'t Forget to Drink!!',
  event_time: DateTime.now + 1,
  calendar_id: Calendar.first.id
)
Event.create!(
  title: 'Feelings2',
  description: '2Don\'t Forget to Drink!!',
  event_time: DateTime.now + 1,
  calendar_id: Calendar.first.id
)
Event.create!(
  title: 'Feelings3',
  description: '3Don\'t Forget to Drink!!',
  event_time: DateTime.now,
  calendar_id: Calendar.first.id
)
Event.create!(
  title: 'Feelings4',
  description: '4Don\'t Forget to Drink!!',
  event_time: DateTime.now + 3,
  calendar_id: Calendar.first.id
)
Event.create!(
  title: 'Feelings5',
  description: '5Don\'t Forget to Drink!!',
  event_time: DateTime.now - 1,
  calendar_id: Calendar.first.id
)
