import { useEffect, useRef, useState } from 'react'
import archeryIcon from '../assets/activities/icon-archery.png'
import beachSportsIcon from '../assets/activities/icon-beach-sports.png'
import bridgeClimbIcon from '../assets/activities/icon-bridge-climb.png'
import campingIcon from '../assets/activities/icon-camping.png'
import climbingIcon from '../assets/activities/icon-climbing.png'
import cyclingIcon from '../assets/activities/icon-cycling.png'
import fishingIcon from '../assets/activities/icon-fishing.png'
import golfIcon from '../assets/activities/icon-golf.png'
import hikingBushwalkIcon from '../assets/activities/icon-hiking-bushwalk.png'
import horseRidingIcon from '../assets/activities/icon-horse-riding.png'
import hotAirBalloonIcon from '../assets/activities/icon-hot-air-balloon.png'
import kayakingIcon from '../assets/activities/icon-kayaking.png'
import paraglidingIcon from '../assets/activities/icon-paragliding.png'
import racketSportsIcon from '../assets/activities/icon-racket-sports.png'
import rowingIcon from '../assets/activities/icon-rowing.png'
import runningIcon from '../assets/activities/icon-running.png'
import sailingIcon from '../assets/activities/icon-sailing.png'
import sandBoardingIcon from '../assets/activities/icon-sand-boarding.png'
import scubaDivingIcon from '../assets/activities/icon-scuba-diving.png'
import snorkelingSwimmingIcon from '../assets/activities/icon-snorkeling-swimming.png'
import snowsportsIcon from '../assets/activities/icon-snowsports.png'
import supIcon from '../assets/activities/icon-sup.png'
import surfingIcon from '../assets/activities/icon-surfing.png'
import whiteWaterRaftingIcon from '../assets/activities/icon-whitewater-rafting.png'
import windSurfingIcon from '../assets/activities/icon-wind-surfing.png'
import yogaWellnessIcon from '../assets/activities/icon-yoga-wellness.png'
import headerLogo from '../assets/brand/logo-header.png'
import locationPin from '../assets/brand/location-pin.png'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

const hikingDescription =
  "Just north of Sydney, Ku-ring-gai Chase National Park is a bushwalker's escape into sandstone cliffs, eucalyptus forest and sweeping coastal views. From quick scenic tracks to longer hikes past Aboriginal rock engravings and hidden coves, every trail feels a world away from the city-quiet, raw and unmistakably Australian."

const kayakingDescription =
  'Glide across Sydney Harbour with skyline views, calm inlets and iconic landmarks all around. This paddle gives you an easy adventure close to the city, with short launch-to-water time and a relaxed route perfect for beginners and regular paddlers.'

const paddleDescription =
  "Cruise along Manly's sheltered waters for a laid-back paddle session with beach views and open ocean air. It's a simple way to reset outdoors, with easy gear rental nearby and conditions that suit a short but rewarding outing."

const campingDescription =
  'Seal Rocks offers quiet coastal camping with forest surrounds, nearby beaches and clear night skies. This longer round trip rewards you with a full nature escape, ideal for unplugging and spending quality time outdoors.'

const surfLessonsDescription =
  'Learn to surf on one of Australia\'s most iconic beaches with a beginner-friendly class in Bondi. Instructors cover paddling, pop-ups and ocean safety so you can get into real waves with confidence.'

const tennisDescription =
  'Book a social hit or guided coaching session at Sydney Olympic Park, home to championship-level courts and facilities. It is an easy active option close to the city with sessions available day and evening.'

const climbingDescription =
  'Try a bouldering or top-rope climbing session in St Peters for a fun full-body workout. Routes suit first-timers through to experienced climbers, with gear hire and intro support available on site.'

const snorkellingDescription =
  'Explore the Cabbage Tree Bay Aquatic Reserve at Shelly Beach with clear water and marine life close to shore. Guided snorkelling sessions make it easy to enjoy an ocean adventure without leaving Sydney.'

const sailingDescription =
  'Join a harbour sailing session from Rushcutters Bay and experience Sydney from the water. Learn the basics of trimming sails and steering while enjoying city skyline views and fresh sea air.'

const mountainBikeDescription =
  'Ride Blue Mountains trails near Glenbrook with flowing single-track, forest scenery and lookout points. Guided mountain biking sessions can be tailored from beginner loops to more technical terrain.'

const scubaDescription =
  'Head to Nelson Bay for a guided scuba diving charter around Port Stephens reefs and marine life. Intro and certified diver options are available, making this a bookable coastal escape from Sydney.'

const snowDescription =
  'Book ski or snowboard lessons in Perisher during snow season, with packages for first-time and intermediate riders. It is a bigger trip from Sydney, but ideal for a full winter recreation day.'

const additionalActivities = [
  {
    id: 'activity-01',
    title: 'City Park Run Session',
    location: 'The Domain, Sydney',
    driveTime: '1hr Round Trip',
    roundTrip: '1hr Round Trip',
    description:
      'Join a coached city run session focused on pacing, technique and recovery in central Sydney.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'activity-02',
    title: 'SUP Yoga',
    location: 'Rose Bay',
    driveTime: '1hr 30m Round Trip',
    roundTrip: '1hr 30m Round Trip',
    description:
      'Combine stand-up paddle boarding with a guided yoga flow in calm harbour water at Rose Bay.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'activity-03',
    title: 'Beach Volleyball Clinic',
    location: 'Coogee Beach',
    driveTime: '1hr 45m Round Trip',
    roundTrip: '1hr 45m Round Trip',
    description:
      'Train passing, serving and game strategy with a social beach volleyball coaching session.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'activity-04',
    title: 'Indoor Trampoline Fitness',
    location: 'Alexandria',
    driveTime: '2hr Round Trip',
    roundTrip: '2hr Round Trip',
    description:
      'High-energy trampoline training with guided drills for cardio, balance and coordination.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'activity-05',
    title: 'BMX Pump Track Session',
    location: 'Sydney Olympic Park',
    driveTime: '2hr 10m Round Trip',
    roundTrip: '2hr 10m Round Trip',
    description:
      'Ride a guided BMX pump track session focused on cornering, momentum and bike control.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'activity-06',
    title: 'Open Water Swim Clinic',
    location: 'Balmoral Beach',
    driveTime: '2hr 20m Round Trip',
    roundTrip: '2hr 20m Round Trip',
    description:
      'Build confidence in the ocean with coached open-water techniques and safety guidance.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'activity-07',
    title: 'Pickleball Coaching',
    location: 'North Sydney',
    driveTime: '2hr 30m Round Trip',
    roundTrip: '2hr 30m Round Trip',
    description:
      'Learn pickleball fundamentals with a friendly coaching block and match-play practice.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'activity-08',
    title: 'Table Tennis Club Night',
    location: 'Chatswood',
    driveTime: '2hr 40m Round Trip',
    roundTrip: '2hr 40m Round Trip',
    description:
      'Play social table tennis with structured drills, skill stations and coached games.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'activity-09',
    title: 'Archery Beginner Class',
    location: 'Sydney Olympic Park',
    driveTime: '2hr 50m Round Trip',
    roundTrip: '2hr 50m Round Trip',
    description:
      'Try target archery in a supervised class covering stance, aim and range safety.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'activity-10',
    title: 'Dragon Boating Trial',
    location: 'Darling Harbour',
    driveTime: '3hr Round Trip',
    roundTrip: '3hr Round Trip',
    description:
      'Join a team paddle session and learn dragon boating rhythm, technique and timing.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'activity-11',
    title: 'Disc Golf Round',
    location: 'Prospect Reservoir',
    driveTime: '3hr 10m Round Trip',
    roundTrip: '3hr 10m Round Trip',
    description:
      'Play a full disc golf circuit with throwing tips and beginner-friendly challenge lines.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'activity-12',
    title: 'Indoor Ice Skating Session',
    location: 'Macquarie Park',
    driveTime: '3hr 20m Round Trip',
    roundTrip: '3hr 20m Round Trip',
    description:
      'Book an ice skating practice block with optional coaching for turns, stops and balance.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'activity-13',
    title: 'Freediving Intro',
    location: 'Cabbage Tree Bay, Manly',
    driveTime: '3hr 30m Round Trip',
    roundTrip: '3hr 30m Round Trip',
    description:
      'Learn breath-hold technique, water confidence and freediving basics in protected waters.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'activity-14',
    title: 'Lawn Bowls Social',
    location: 'Bondi Junction',
    driveTime: '3hr 40m Round Trip',
    roundTrip: '3hr 40m Round Trip',
    description:
      'Enjoy a relaxed lawn bowls social with quick coaching and friendly competition.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'activity-15',
    title: 'Surf Skills Clinic',
    location: 'Cronulla Beach',
    driveTime: '3hr 50m Round Trip',
    roundTrip: '3hr 50m Round Trip',
    description:
      'Progress your surf technique with drills for paddling, take-offs and wave positioning.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'activity-16',
    title: 'BridgeClimb Experience',
    location: 'Sydney Harbour Bridge',
    driveTime: '4hr Round Trip',
    roundTrip: '4hr Round Trip',
    description:
      'Climb the Sydney Harbour Bridge with a guided group and panoramic city views.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'activity-17',
    title: 'Whitewater Rafting Session',
    location: 'Penrith Whitewater Stadium',
    driveTime: '4hr 10m Round Trip',
    roundTrip: '4hr 10m Round Trip',
    description:
      'Take on guided whitewater rafting with safety briefing, paddling drills and rapids.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'activity-18',
    title: 'Kayak Fishing Charter',
    location: 'Pittwater',
    driveTime: '4hr 20m Round Trip',
    roundTrip: '4hr 20m Round Trip',
    description:
      'Paddle and fish with local guides in Pittwater, ideal for first-timers and hobby anglers.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'activity-19',
    title: 'Trail Running Clinic',
    location: 'Royal National Park',
    driveTime: '4hr 30m Round Trip',
    roundTrip: '4hr 30m Round Trip',
    description:
      'Build trail confidence with coached pacing, footing and hill technique in bush terrain.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'activity-20',
    title: 'Horse Riding Trail',
    location: 'Terrey Hills',
    driveTime: '4hr 40m Round Trip',
    roundTrip: '4hr 40m Round Trip',
    description:
      'Ride guided bush trails through northern Sydney with calm horses and scenic routes.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'activity-21',
    title: 'Paragliding Tandem Flight',
    location: 'Stanwell Park',
    driveTime: '4hr 50m Round Trip',
    roundTrip: '4hr 50m Round Trip',
    description:
      'Fly tandem with an instructor over the Illawarra coastline for a high-adrenaline outing.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'activity-22',
    title: 'Wakeboarding Session',
    location: 'Penrith',
    driveTime: '5hr Round Trip',
    roundTrip: '5hr Round Trip',
    description:
      'Book a wakeboarding session with cable park access and coaching for new riders.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'activity-23',
    title: 'Orienteering Challenge',
    location: 'Lane Cove National Park',
    driveTime: '5hr 10m Round Trip',
    roundTrip: '5hr 10m Round Trip',
    description:
      'Navigate checkpoints with map and compass in a guided orienteering skills challenge.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'activity-24',
    title: 'Scenic E-Bike Tour',
    location: 'Wollongong',
    driveTime: '5hr 20m Round Trip',
    roundTrip: '5hr 20m Round Trip',
    description:
      'Ride coastal routes on an e-bike with guide support and local viewpoint stops.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'activity-25',
    title: 'Harbour Sailing Regatta',
    location: 'Pittwater',
    driveTime: '5hr 30m Round Trip',
    roundTrip: '5hr 30m Round Trip',
    description:
      'Join a coached race-format sailing day focused on teamwork and tactics.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'activity-26',
    title: 'Adventure Ropes Course',
    location: 'St Ives',
    driveTime: '5hr 40m Round Trip',
    roundTrip: '5hr 40m Round Trip',
    description:
      'Take on high ropes, zip lines and obstacle elements in a guided outdoor course.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'activity-27',
    title: 'Rock Fishing Workshop',
    location: 'La Perouse',
    driveTime: '5hr 50m Round Trip',
    roundTrip: '5hr 50m Round Trip',
    description:
      'Learn safe rock fishing setup, casting and local conditions with expert mentors.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'activity-28',
    title: 'Golf Driving Range Clinic',
    location: 'Moore Park',
    driveTime: '6hr Round Trip',
    roundTrip: '6hr Round Trip',
    description:
      'Improve your swing mechanics through a guided driving range and short game session.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'activity-29',
    title: 'Indoor Ski Training',
    location: 'Miranda',
    driveTime: '6hr 10m Round Trip',
    roundTrip: '6hr 10m Round Trip',
    description:
      'Prepare for snow season with balance and edging drills on indoor ski simulators.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'activity-30',
    title: 'Kitesurfing Lesson',
    location: 'Botany Bay',
    driveTime: '6hr 20m Round Trip',
    roundTrip: '6hr 20m Round Trip',
    description:
      'Train with certified instructors on kite control, body drag and safe launch technique.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'activity-31',
    title: 'Badminton Social Session',
    location: 'Lidcombe',
    driveTime: '6hr 30m Round Trip',
    roundTrip: '6hr 30m Round Trip',
    description:
      'Play social badminton with rotating doubles games and optional coaching tips.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'activity-32',
    title: 'Rowing Intro Session',
    location: 'Iron Cove',
    driveTime: '6hr 40m Round Trip',
    roundTrip: '6hr 40m Round Trip',
    description:
      'Try rowing fundamentals in stable boats with coaching on stroke rhythm and timing.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'activity-33',
    title: 'Outdoor Yoga and Hike',
    location: 'Bundeena',
    driveTime: '6hr 50m Round Trip',
    roundTrip: '6hr 50m Round Trip',
    description:
      'Blend a guided coastal hike with outdoor yoga and breathwork in Royal National Park.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'activity-34',
    title: 'Scuba Shore Dive',
    location: 'Bass Point, Shellharbour',
    driveTime: '7hr Round Trip',
    roundTrip: '7hr Round Trip',
    description:
      'Complete a guided shore dive with marine life spotting and supervised underwater practice.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'activity-35',
    title: 'Abseiling Adventure',
    location: 'Katoomba',
    driveTime: '7hr 15m Round Trip',
    roundTrip: '7hr 15m Round Trip',
    description:
      'Learn descending techniques on sandstone cliffs with qualified outdoor instructors.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'activity-36',
    title: 'Sea Kayak Day Tour',
    location: 'Jervis Bay',
    driveTime: '7hr 30m Round Trip',
    roundTrip: '7hr 30m Round Trip',
    description:
      'Paddle Jervis Bay with guide support, wildlife spotting and beach landings.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'activity-37',
    title: 'Canyoning Experience',
    location: 'Blue Mountains',
    driveTime: '7hr 45m Round Trip',
    roundTrip: '7hr 45m Round Trip',
    description:
      'Explore canyons through short swims, jumps and abseils on a guided adventure route.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'activity-38',
    title: 'Night Astronomy Hike',
    location: 'Blackheath, Blue Mountains',
    driveTime: '8hr Round Trip',
    roundTrip: '8hr Round Trip',
    description:
      'Join an evening hike and stargazing experience led by local guides and astronomy hosts.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'activity-39',
    title: 'Dolphin Kayak Tour',
    location: 'Port Stephens',
    driveTime: '8hr 15m Round Trip',
    roundTrip: '8hr 15m Round Trip',
    description:
      'Kayak in Port Stephens with the chance to spot dolphins in sheltered coastal water.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'activity-40',
    title: 'Horse Beach Ride',
    location: 'Port Stephens',
    driveTime: '8hr 30m Round Trip',
    roundTrip: '8hr 30m Round Trip',
    description:
      'Enjoy a guided horse ride along coastal trails and sandy stretches near the bay.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'activity-41',
    title: 'Sandboarding Tour',
    location: 'Stockton Bight',
    driveTime: '8hr 45m Round Trip',
    roundTrip: '8hr 45m Round Trip',
    description:
      'Ride giant coastal dunes with local guides on a high-energy sandboarding excursion.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'activity-42',
    title: 'Surf Lifesaving Fitness',
    location: 'Manly Beach',
    driveTime: '9hr Round Trip',
    roundTrip: '9hr Round Trip',
    description:
      'Train with surf lifesaving style beach fitness drills and ocean awareness coaching.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'activity-43',
    title: 'Windsurfing Lesson',
    location: 'Lake Illawarra',
    driveTime: '9hr 15m Round Trip',
    roundTrip: '9hr 15m Round Trip',
    description:
      'Develop windsurf basics with instructor-led sessions on sail handling and board control.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'activity-44',
    title: 'Cave Guided Walk',
    location: 'Jenolan Caves',
    driveTime: '9hr 30m Round Trip',
    roundTrip: '9hr 30m Round Trip',
    description:
      'Discover limestone cave chambers on a guided walking tour through Jenolan Caves.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'activity-45',
    title: 'Winery Cycling Tour',
    location: 'Hunter Valley',
    driveTime: '9hr 45m Round Trip',
    roundTrip: '9hr 45m Round Trip',
    description:
      'Cycle scenic vineyard routes with a hosted group tour through Hunter Valley estates.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'activity-46',
    title: 'Snorkel with Seals',
    location: 'Montague Island, Narooma',
    driveTime: '10hr Round Trip',
    roundTrip: '10hr Round Trip',
    description:
      'Take a guided snorkel charter to swim near playful seals around Montague Island.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'activity-47',
    title: 'Sea Cliff Coastal Trek',
    location: 'Kiama Coast Walk',
    driveTime: '10hr 30m Round Trip',
    roundTrip: '10hr 30m Round Trip',
    description:
      'Complete a long coastal guided trek with cliff-top views and lookout stops.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'activity-48',
    title: 'Hot Air Balloon Flight',
    location: 'Camden',
    driveTime: '11hr Round Trip',
    roundTrip: '11hr Round Trip',
    description:
      'Experience sunrise hot air ballooning with pre-flight setup and post-flight celebration.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'activity-49',
    title: 'Alpine Summit Hike',
    location: 'Mount Kosciuszko, Thredbo',
    driveTime: '11hr 30m Round Trip',
    roundTrip: '11hr 30m Round Trip',
    description:
      'Tackle an alpine summit route with guides, mountain safety briefings and scenic viewpoints.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'activity-50',
    title: 'Backcountry Snowshoe Tour',
    location: 'Perisher Valley',
    driveTime: '12hr Round Trip',
    roundTrip: '12hr Round Trip',
    description:
      'Explore snow trails on a guided backcountry snowshoe tour in the Snowy Mountains.',
    placeholderClass: 'activity-thumb-2',
  },
]

const activities = [
  {
    id: 'hiking',
    title: 'Hiking',
    location: 'Ku-ring-gai Chase',
    driveTime: '4hr 30m Round Trip',
    roundTrip: '4hr 30m Round Trip',
    description: hikingDescription,
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'kayaking',
    title: 'Kayaking',
    location: 'Sydney Harbour',
    driveTime: '2hr 40m Round Trip',
    roundTrip: '2hr 40m Round Trip',
    description: kayakingDescription,
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'paddle-boarding',
    title: 'Paddle Boarding',
    location: 'Manly',
    driveTime: '3hr Round Trip',
    roundTrip: '3hr Round Trip',
    description: paddleDescription,
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'camping-1',
    title: 'Camping',
    location: 'Seal Rocks',
    driveTime: '31hr 10m Round Trip',
    roundTrip: '31hr 10m Round Trip',
    description: campingDescription,
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'camping-2',
    title: 'Surf Lessons',
    location: 'Bondi Beach',
    driveTime: '2hr 20m Round Trip',
    roundTrip: '2hr 20m Round Trip',
    description: surfLessonsDescription,
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'camping-3',
    title: 'Tennis Coaching',
    location: 'Sydney Olympic Park',
    driveTime: '2hr 10m Round Trip',
    roundTrip: '2hr 10m Round Trip',
    description: tennisDescription,
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'camping-4',
    title: 'Rock Climbing',
    location: 'St Peters',
    driveTime: '2hr 10m Round Trip',
    roundTrip: '2hr 10m Round Trip',
    description: climbingDescription,
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'camping-5',
    title: 'Snorkelling Tour',
    location: 'Shelly Beach, Manly',
    driveTime: '3hr 30m Round Trip',
    roundTrip: '3hr 30m Round Trip',
    description: snorkellingDescription,
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'camping-6',
    title: 'Sailing Session',
    location: 'Rushcutters Bay',
    driveTime: '2hr 50m Round Trip',
    roundTrip: '2hr 50m Round Trip',
    description: sailingDescription,
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'camping-7',
    title: 'Mountain Biking',
    location: 'Glenbrook, Blue Mountains',
    driveTime: '5hr 40m Round Trip',
    roundTrip: '5hr 40m Round Trip',
    description: mountainBikeDescription,
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'camping-8',
    title: 'Scuba Diving Charter',
    location: 'Nelson Bay',
    driveTime: '8hr 20m Round Trip',
    roundTrip: '8hr 20m Round Trip',
    description: scubaDescription,
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'camping-9',
    title: 'Ski/Snowboard Lesson',
    location: 'Perisher',
    driveTime: '2 Days Round Trip',
    roundTrip: '2 Days Round Trip',
    description: snowDescription,
    placeholderClass: 'activity-thumb-4',
  },
  ...additionalActivities,
]

const melbourneActivities = [
  {
    id: 'melb-01',
    title: 'Yarra River Kayak',
    location: 'Docklands, Melbourne',
    driveTime: '1hr Round Trip',
    roundTrip: '1hr Round Trip',
    description:
      'Paddle a calm section of the Yarra with a guided city kayak session suited to beginners.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'melb-02',
    title: 'St Kilda Beach Fitness',
    location: 'St Kilda',
    driveTime: '1hr 15m Round Trip',
    roundTrip: '1hr 15m Round Trip',
    description:
      'Join a coached beach fitness class at St Kilda focused on cardio, mobility and recovery.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'melb-03',
    title: 'Albert Park Running Club',
    location: 'Albert Park',
    driveTime: '1hr 30m Round Trip',
    roundTrip: '1hr 30m Round Trip',
    description:
      'Train with a social running group around Albert Park Lake with pacing support.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'melb-04',
    title: 'Brunswick Climbing Session',
    location: 'Brunswick',
    driveTime: '1hr 45m Round Trip',
    roundTrip: '1hr 45m Round Trip',
    description:
      'Book a bouldering session in Brunswick with routes for first-timers through advanced climbers.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'melb-05',
    title: 'Williamstown Sailing Intro',
    location: 'Williamstown',
    driveTime: '2hr Round Trip',
    roundTrip: '2hr Round Trip',
    description:
      'Learn sailing basics in sheltered water with a beginner-focused practical lesson.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'melb-06',
    title: 'Tennis Coaching Session',
    location: 'Melbourne Park',
    driveTime: '2hr 10m Round Trip',
    roundTrip: '2hr 10m Round Trip',
    description:
      'Take a private or group tennis coaching block at Melbourne Park courts.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'melb-07',
    title: 'SUP Lesson on the Bay',
    location: 'Brighton Beach',
    driveTime: '2hr 20m Round Trip',
    roundTrip: '2hr 20m Round Trip',
    description:
      'Learn stand-up paddle technique on calmer bay water near Brighton.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'melb-08',
    title: 'Mountain Bike Skills Clinic',
    location: 'Lysterfield Park',
    driveTime: '2hr 30m Round Trip',
    roundTrip: '2hr 30m Round Trip',
    description:
      'Build cornering and trail confidence with a coached MTB clinic at Lysterfield.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'melb-09',
    title: 'Yarra Bend Trail Ride',
    location: 'Yarra Bend Park',
    driveTime: '2hr 40m Round Trip',
    roundTrip: '2hr 40m Round Trip',
    description:
      'Enjoy a guided trail ride through riverside tracks and open parkland.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'melb-10',
    title: 'Northcote Yoga Outdoors',
    location: 'Northcote',
    driveTime: '2hr 50m Round Trip',
    roundTrip: '2hr 50m Round Trip',
    description:
      'Reset with an outdoor yoga flow and breathwork session in Northcote parklands.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'melb-11',
    title: 'Rowing Intro',
    location: 'Boathouse Drive, Melbourne',
    driveTime: '3hr Round Trip',
    roundTrip: '3hr Round Trip',
    description:
      'Try rowing fundamentals with coaching on stroke timing and technique.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'melb-12',
    title: 'Fitzroy Pickleball',
    location: 'Fitzroy',
    driveTime: '3hr 10m Round Trip',
    roundTrip: '3hr 10m Round Trip',
    description:
      'Play social pickleball with beginner coaching and mixed doubles games.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'melb-13',
    title: 'Geelong Surf Session',
    location: 'Torquay',
    driveTime: '3hr 20m Round Trip',
    roundTrip: '3hr 20m Round Trip',
    description:
      'Join a coached surf class on Surf Coast waves with local instructors.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'melb-14',
    title: 'Mornington Snorkel',
    location: 'Mornington Peninsula',
    driveTime: '3hr 30m Round Trip',
    roundTrip: '3hr 30m Round Trip',
    description:
      'Explore shallow reef spots with a guided snorkelling experience.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'melb-15',
    title: 'Dandenong Ranges Hike',
    location: 'Olinda',
    driveTime: '3hr 40m Round Trip',
    roundTrip: '3hr 40m Round Trip',
    description:
      'Take a guided forest hike through fern gullies and scenic lookouts.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'melb-16',
    title: 'Puffing Billy Trail Day',
    location: 'Belgrave',
    driveTime: '3hr 50m Round Trip',
    roundTrip: '3hr 50m Round Trip',
    description:
      'Combine a scenic trail walk with mountain air and heritage rail surroundings.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'melb-17',
    title: 'Healesville Nature Walk',
    location: 'Healesville',
    driveTime: '4hr Round Trip',
    roundTrip: '4hr Round Trip',
    description:
      'Enjoy a guided bushwalk experience through Yarra Valley nature reserves.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'melb-18',
    title: 'Werribee Horse Riding',
    location: 'Werribee Park',
    driveTime: '4hr 10m Round Trip',
    roundTrip: '4hr 10m Round Trip',
    description:
      'Book a horse trail ride suited to beginner and intermediate riders.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'melb-19',
    title: 'Peninsula Hot Springs Walk',
    location: 'Fingal',
    driveTime: '4hr 20m Round Trip',
    roundTrip: '4hr 20m Round Trip',
    description:
      'Pair a long coastal walk with a restorative wellness stop on the peninsula.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'melb-20',
    title: 'Great Ocean Road Hike',
    location: 'Anglesea',
    driveTime: '4hr 30m Round Trip',
    roundTrip: '4hr 30m Round Trip',
    description:
      'Hike coastal tracks with dramatic views and guided local trail insights.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'melb-21',
    title: 'Bellarine E-Bike Tour',
    location: 'Queenscliff',
    driveTime: '4hr 40m Round Trip',
    roundTrip: '4hr 40m Round Trip',
    description:
      'Ride a scenic e-bike route across Bellarine coastline and village paths.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'melb-22',
    title: 'Phillip Island Surf',
    location: 'Cape Woolamai',
    driveTime: '4hr 50m Round Trip',
    roundTrip: '4hr 50m Round Trip',
    description:
      'Take a surf progression lesson with beach safety coaching on Phillip Island.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'melb-23',
    title: 'Lorne Trail Run',
    location: 'Lorne',
    driveTime: '5hr Round Trip',
    roundTrip: '5hr Round Trip',
    description:
      'Run guided coastal and bush trails with pacing support and technique tips.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'melb-24',
    title: 'Ballarat Kayak Day',
    location: 'Lake Wendouree',
    driveTime: '5hr 10m Round Trip',
    roundTrip: '5hr 10m Round Trip',
    description:
      'Enjoy a flatwater kayak outing on Lake Wendouree with instructor guidance.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'melb-25',
    title: 'Bacchus Marsh Climb',
    location: 'Werribee Gorge',
    driveTime: '5hr 20m Round Trip',
    roundTrip: '5hr 20m Round Trip',
    description:
      'Challenge yourself on a guided gorge scramble and rock movement session.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'melb-26',
    title: 'Geelong Sailing Day',
    location: 'Geelong Waterfront',
    driveTime: '5hr 30m Round Trip',
    roundTrip: '5hr 30m Round Trip',
    description:
      'Spend a half-day learning practical sailing skills along Corio Bay.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'melb-27',
    title: 'Bendigo Bike Trails',
    location: 'Bendigo',
    driveTime: '5hr 40m Round Trip',
    roundTrip: '5hr 40m Round Trip',
    description:
      'Ride a curated set of bike trails through bushland and regional park routes.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'melb-28',
    title: 'Daylesford Bushwalk',
    location: 'Wombat Forest',
    driveTime: '5hr 50m Round Trip',
    roundTrip: '5hr 50m Round Trip',
    description:
      'Take a long guided forest walk with lookout stops near Daylesford.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'melb-29',
    title: 'Castlemaine Trail Cycle',
    location: 'Castlemaine',
    driveTime: '6hr Round Trip',
    roundTrip: '6hr Round Trip',
    description:
      'Cycle regional rail-trail sections with support and route planning help.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'melb-30',
    title: 'Cape Schanck Walk',
    location: 'Cape Schanck',
    driveTime: '6hr 10m Round Trip',
    roundTrip: '6hr 10m Round Trip',
    description:
      'Explore dramatic boardwalks and cliffline tracks on a guided coastal route.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'melb-31',
    title: 'Wilsons Prom Hike',
    location: 'Wilsons Promontory',
    driveTime: '6hr 20m Round Trip',
    roundTrip: '6hr 20m Round Trip',
    description:
      'Complete a guided national park hike with beach and granite headland views.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'melb-32',
    title: 'Gippsland Surf Camp',
    location: 'Inverloch',
    driveTime: '6hr 30m Round Trip',
    roundTrip: '6hr 30m Round Trip',
    description:
      'Build surf confidence in a coached camp format on the Gippsland coast.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'melb-33',
    title: 'Grampians Climb Intro',
    location: 'Halls Gap',
    driveTime: '6hr 40m Round Trip',
    roundTrip: '6hr 40m Round Trip',
    description:
      'Try entry-level climbing and movement drills in the Grampians region.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'melb-34',
    title: 'Otways Zipline Adventure',
    location: 'Yeodene',
    driveTime: '6hr 50m Round Trip',
    roundTrip: '6hr 50m Round Trip',
    description:
      'Take on treetop zipline courses and elevated rope elements in the Otways.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'melb-35',
    title: 'Apollo Bay Kayak',
    location: 'Apollo Bay',
    driveTime: '7hr Round Trip',
    roundTrip: '7hr Round Trip',
    description:
      'Paddle sheltered bay waters with a guided sea-kayaking session.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'melb-36',
    title: 'Mount Macedon Trail Day',
    location: 'Mount Macedon',
    driveTime: '7hr 15m Round Trip',
    roundTrip: '7hr 15m Round Trip',
    description:
      'Walk and train on elevated forest trails with viewpoint breaks.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'melb-37',
    title: 'Bellarine Paddle Tour',
    location: 'Portarlington',
    driveTime: '7hr 30m Round Trip',
    roundTrip: '7hr 30m Round Trip',
    description:
      'Join a long paddle tour along Bellarine inlets and calm shoreline sections.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'melb-38',
    title: 'Torquay Coastal Ride',
    location: 'Torquay Foreshore',
    driveTime: '7hr 45m Round Trip',
    roundTrip: '7hr 45m Round Trip',
    description:
      'Ride coastal bike paths and nearby trails on a supported day route.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'melb-39',
    title: 'Anglesea Surf Rescue Fitness',
    location: 'Anglesea',
    driveTime: '8hr Round Trip',
    roundTrip: '8hr Round Trip',
    description:
      'Train with beach and surf fitness drills inspired by lifesaving programs.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'melb-40',
    title: 'Lakes Entrance Paddle',
    location: 'Lakes Entrance',
    driveTime: '8hr 15m Round Trip',
    roundTrip: '8hr 15m Round Trip',
    description:
      'Explore broad waterways with a guided paddle around Lakes Entrance channels.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'melb-41',
    title: 'Baw Baw Snow Play',
    location: 'Mount Baw Baw',
    driveTime: '8hr 30m Round Trip',
    roundTrip: '8hr 30m Round Trip',
    description:
      'Book a snow activity day with beginner-friendly alpine instruction.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'melb-42',
    title: 'Falls Creek Hike Prep',
    location: 'Falls Creek',
    driveTime: '8hr 45m Round Trip',
    roundTrip: '8hr 45m Round Trip',
    description:
      'Join an all-day alpine conditioning and hike prep experience.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'melb-43',
    title: 'Mount Buller Ski Intro',
    location: 'Mount Buller',
    driveTime: '9hr Round Trip',
    roundTrip: '9hr Round Trip',
    description:
      'Learn foundational ski skills with instructors on beginner slopes.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'melb-44',
    title: 'Hotham Snowboard Clinic',
    location: 'Mount Hotham',
    driveTime: '9hr 15m Round Trip',
    roundTrip: '9hr 15m Round Trip',
    description:
      'Take a snowboard progression clinic with technique drills and guided laps.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'melb-45',
    title: 'Alpine Trail Run Camp',
    location: 'Bright',
    driveTime: '9hr 30m Round Trip',
    roundTrip: '9hr 30m Round Trip',
    description:
      'Join a full-day trail running camp in alpine foothill terrain.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'melb-46',
    title: 'Murray River Kayak Day',
    location: 'Echuca',
    driveTime: '9hr 45m Round Trip',
    roundTrip: '9hr 45m Round Trip',
    description:
      'Spend a long guided day kayaking scenic sections of the Murray River.',
    placeholderClass: 'activity-thumb-2',
  },
  {
    id: 'melb-47',
    title: 'Grampians Summit Trek',
    location: 'Grampians National Park',
    driveTime: '10hr 30m Round Trip',
    roundTrip: '10hr 30m Round Trip',
    description:
      'Complete a guided summit trek with major viewpoints and trail coaching.',
    placeholderClass: 'activity-thumb-3',
  },
  {
    id: 'melb-48',
    title: 'Mallacoota Coastal Adventure',
    location: 'Mallacoota',
    driveTime: '11hr Round Trip',
    roundTrip: '11hr Round Trip',
    description:
      'Take a long-format coastal adventure with paddling and shoreline exploration.',
    placeholderClass: 'activity-thumb-4',
  },
  {
    id: 'melb-49',
    title: 'Snowy Mountains Traverse',
    location: 'Dinner Plain',
    driveTime: '11hr 30m Round Trip',
    roundTrip: '11hr 30m Round Trip',
    description:
      'Experience a high-country traverse day with guided alpine navigation.',
    placeholderClass: 'activity-thumb-1',
  },
  {
    id: 'melb-50',
    title: 'Victorian Alps Endurance Day',
    location: 'Bogong High Plains',
    driveTime: '12hr Round Trip',
    roundTrip: '12hr Round Trip',
    description:
      'Tackle an endurance-style alpine recreation day in the Victorian Alps.',
    placeholderClass: 'activity-thumb-2',
  },
]

const halfHourTimeOptions = Array.from({ length: 48 }, (_, index) => {
  const hours = String(Math.floor(index / 2)).padStart(2, '0')
  const minutes = index % 2 === 0 ? '00' : '30'
  const value = `${hours}:${minutes}`
  return { value, label: value }
})

const iconByCategory = {
  archery: archeryIcon,
  beachSports: beachSportsIcon,
  bridgeClimb: bridgeClimbIcon,
  camping: campingIcon,
  climbing: climbingIcon,
  cycling: cyclingIcon,
  fishing: fishingIcon,
  golf: golfIcon,
  hikingBushwalk: hikingBushwalkIcon,
  horseRiding: horseRidingIcon,
  hotAirBalloon: hotAirBalloonIcon,
  kayaking: kayakingIcon,
  paragliding: paraglidingIcon,
  racketSports: racketSportsIcon,
  rowing: rowingIcon,
  running: runningIcon,
  sailing: sailingIcon,
  sandBoarding: sandBoardingIcon,
  scubaDiving: scubaDivingIcon,
  snorkelingSwimming: snorkelingSwimmingIcon,
  snowsports: snowsportsIcon,
  sup: supIcon,
  surfing: surfingIcon,
  whiteWaterRafting: whiteWaterRaftingIcon,
  windSurfing: windSurfingIcon,
  yogaWellness: yogaWellnessIcon,
}

const activityIconRules = [
  { pattern: /(bridge\s?climb)/i, category: 'bridgeClimb' },
  { pattern: /(hot air balloon|balloon)/i, category: 'hotAirBalloon' },
  { pattern: /(horse|equestrian)/i, category: 'horseRiding' },
  { pattern: /(whitewater|white water|rafting)/i, category: 'whiteWaterRafting' },
  { pattern: /(windsurf|kitesurf|wind surf)/i, category: 'windSurfing' },
  { pattern: /(sandboard|sand boarding)/i, category: 'sandBoarding' },
  { pattern: /(surf|surfing)/i, category: 'surfing' },
  { pattern: /(golf)/i, category: 'golf' },
  { pattern: /(archery)/i, category: 'archery' },
  { pattern: /(kayak|kayaking)/i, category: 'kayaking' },
  { pattern: /(sail|sailing)/i, category: 'sailing' },
  { pattern: /(paragliding|paraglid)/i, category: 'paragliding' },
  { pattern: /(rowing|dragon boating|boating trial)/i, category: 'rowing' },
  { pattern: /(fish|fishing)/i, category: 'fishing' },
  { pattern: /(tennis|pickleball|badminton|racket)/i, category: 'racketSports' },
  { pattern: /(volleyball|beach volleyball)/i, category: 'beachSports' },
  { pattern: /(ski|snowboard|snowshoe|snow play|snow)/i, category: 'snowsports' },
  { pattern: /(stand-up paddle|stand up paddle|\\bsup\\b|paddle boarding)/i, category: 'sup' },
  { pattern: /(yoga|wellness|hot springs)/i, category: 'yogaWellness' },
  { pattern: /(cycl|bike|e-bike|mountain bike)/i, category: 'cycling' },
  { pattern: /(camp|camping)/i, category: 'camping' },
  { pattern: /(scuba|dive)/i, category: 'scubaDiving' },
  { pattern: /(climb|climbing|abseil|canyon|zipline|ropes)/i, category: 'climbing' },
  { pattern: /(snorkel|swim|swimming|freediving)/i, category: 'snorkelingSwimming' },
  { pattern: /(run|running|orienteering)/i, category: 'running' },
  { pattern: /(hike|hiking|bushwalk|trail|trek|walk)/i, category: 'hikingBushwalk' },
]

const getActivityIcon = (activityTitle) => {
  for (const rule of activityIconRules) {
    if (rule.pattern.test(activityTitle)) {
      return iconByCategory[rule.category]
    }
  }

  return iconByCategory.hikingBushwalk
}

const parseDurationToMinutes = (durationText) => {
  if (!durationText || typeof durationText !== 'string') {
    return Number.NaN
  }

  const normalized = durationText.toLowerCase()
  const dayMatch = normalized.match(/(\d+)\s*day/)
  const hourMatch = normalized.match(/(\d+)\s*h(?:r|rs|our|ours)?/)
  const minuteMatch = normalized.match(/(\d+)\s*m(?:in|ins|inute|inutes)?/)

  const days = dayMatch ? Number.parseInt(dayMatch[1], 10) : 0
  const hours = hourMatch ? Number.parseInt(hourMatch[1], 10) : 0
  const minutes = minuteMatch ? Number.parseInt(minuteMatch[1], 10) : 0

  return days * 24 * 60 + hours * 60 + minutes
}

const recreationTimeToMinutes = (screenTime) => {
  const hours = Number.parseInt(screenTime?.hours ?? 0, 10)
  const minutes = Number.parseInt(screenTime?.minutes ?? 0, 10)

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return Number.NaN
  }

  return hours * 60 + minutes
}

function ActivitiesScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const screenTime = location.state?.screenTime
  const bookingDateInputRef = useRef(null)
  const [userLocation, setUserLocation] = useState('Sydney')
  const [activeActivity, setActiveActivity] = useState(null)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const canBook = Boolean(bookingDate && bookingTime)
  const recreationMinutes = recreationTimeToMinutes(screenTime)
  const isMelbourneLocation = userLocation.trim().toLowerCase().includes('melbourne')
  const locationActivities = isMelbourneLocation ? melbourneActivities : activities

  if (!screenTime) {
    return <Navigate to="/upload" replace />
  }

  useEffect(() => {
    let isActive = true

    if (!navigator.geolocation) {
      return () => {
        isActive = false
      }
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`,
          )

          if (!response.ok) {
            return
          }

          const data = await response.json()
          const resolvedLocation =
            data.city || data.locality || data.principalSubdivision || data.countryName

          if (isActive && resolvedLocation) {
            setUserLocation(resolvedLocation)
          }
        } catch {
          // Keep fallback location when reverse geocoding fails.
        }
      },
      () => {
        // Keep fallback location when permission is denied or unavailable.
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      },
    )

    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    if (!activeActivity) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveActivity(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeActivity])

  const openActivityPopup = (activity) => {
    setActiveActivity(activity)
    setBookingDate('')
    setBookingTime('')
  }

  const openDatePicker = () => {
    const input = bookingDateInputRef.current
    if (!input) {
      return
    }

    input.focus()
    if (typeof input.showPicker === 'function') {
      input.showPicker()
    }
  }

  const handleBookNow = () => {
    if (!activeActivity || !canBook) {
      return
    }

    navigate('/confirmation', {
      state: {
        activityTitle: activeActivity.title,
        activityLocation: activeActivity.location,
        bookingDate,
        bookingTime,
      },
    })
  }

  const timedActivities = locationActivities
    .map((activity) => ({
      activity,
      minutes: parseDurationToMinutes(activity.roundTrip || activity.driveTime),
    }))
    .filter((entry) => Number.isFinite(entry.minutes))

  const eligibleActivities = timedActivities
    .filter((entry) => entry.minutes <= recreationMinutes)
    .sort((a, b) => b.minutes - a.minutes)

  const visibleActivities = eligibleActivities.slice(0, 5).map((entry) => entry.activity)
  const activeActivityIcon = activeActivity ? getActivityIcon(activeActivity.title) : null

  return (
    <main
      className={`screen screen-activities ${activeActivity ? 'popup-open' : ''}`}
      aria-label="Activities screen"
    >
      <header className="activities-fixed">
        <div className="activities-topbar">
          <Link
            to="/"
            replace
            className="brand-lockup-button"
            aria-label="Restart experience"
          >
            <img className="brand-header-logo" src={headerLogo} alt="The Recreation Rebate" />
          </Link>
        </div>

        <div className="activities-summary">
          <p className="activities-summary-label">YOUR RECREATION TIME</p>
          <h2 className="activities-summary-time">
            {screenTime.hours}h&nbsp;{screenTime.minutes}m
          </h2>
          <p className="activities-summary-location">
            <img className="location-icon" src={locationPin} alt="" aria-hidden="true" />
            <span className="location-name">{userLocation.toUpperCase()}</span>
          </p>
        </div>
      </header>

      <section className="activities-scroll" aria-label="Suggested activities">
        <h2 className="activities-heading">SUGGESTED ACTIVITIES</h2>
        <ul className="activities-list">
          {visibleActivities.map((activity) => {
            const activityIcon = getActivityIcon(activity.title)

            return (
              <li key={activity.id} className="activity-card">
                <div className="activity-thumb" aria-hidden="true">
                  <img className="activity-thumb-image" src={activityIcon} alt="" />
                </div>

                <div className="activity-details">
                  <h3 className="activity-title">{activity.title}</h3>
                  <p className="activity-location">{activity.location}</p>
                  <p className="activity-drive-time">{activity.driveTime}</p>
                  <button
                    type="button"
                    className="activity-button"
                    onClick={() => openActivityPopup(activity)}
                  >
                    Explore Activity
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      {activeActivity && (
        <section
          className="activity-popup-backdrop"
          onClick={() => setActiveActivity(null)}
          aria-label="Activity details popup"
        >
          <article
            className="activity-popup-card"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeActivity.title} details`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="activity-popup-close"
              onClick={() => setActiveActivity(null)}
              aria-label="Close activity details"
            >
              <span aria-hidden="true">×</span>
            </button>

            <div className="activity-popup-head">
              <div className="activity-popup-thumb" aria-hidden="true">
                {activeActivityIcon && (
                  <img className="activity-popup-thumb-image" src={activeActivityIcon} alt="" />
                )}
              </div>
              <h3 className="activity-popup-title">{activeActivity.title}</h3>
            </div>

            <p className="activity-popup-meta activity-popup-place">{activeActivity.location}</p>
            <p className="activity-popup-meta activity-popup-trip">{activeActivity.roundTrip}</p>

            <p className="activity-popup-description">{activeActivity.description}</p>

            <section className="activity-booking" aria-label="Choose date and time">
              <div className="activity-booking-grid">
                <label className="activity-booking-field" onClick={openDatePicker}>
                  <span>Date</span>
                  <input
                    ref={bookingDateInputRef}
                    type="date"
                    value={bookingDate}
                    onClick={openDatePicker}
                    onFocus={(event) => {
                      if (typeof event.currentTarget.showPicker === 'function') {
                        event.currentTarget.showPicker()
                      }
                    }}
                    onChange={(event) => setBookingDate(event.target.value)}
                  />
                </label>

                <label className="activity-booking-field">
                  <span>Start time</span>
                  <select
                    value={bookingTime}
                    onChange={(event) => setBookingTime(event.target.value)}
                  >
                    <option value="">Select time</option>
                    {halfHourTimeOptions.map((timeOption) => (
                      <option key={timeOption.value} value={timeOption.value}>
                        {timeOption.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </section>

            <button
              type="button"
              className="activity-popup-book"
              disabled={!canBook}
              onClick={handleBookNow}
            >
              Book Now
            </button>
          </article>
        </section>
      )}
    </main>
  )
}

export default ActivitiesScreen
