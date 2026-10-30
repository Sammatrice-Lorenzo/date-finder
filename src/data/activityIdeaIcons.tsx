import type React from 'react'
import BakeryDiningIcon from '@mui/icons-material/BakeryDining'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining'
import CasinoIcon from '@mui/icons-material/Casino'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import ExtensionIcon from '@mui/icons-material/Extension'
import GolfCourseIcon from '@mui/icons-material/GolfCourse'
import IceSkatingIcon from '@mui/icons-material/IceSkating'
import IcecreamIcon from '@mui/icons-material/Icecream'
import KeyIcon from '@mui/icons-material/Key'
import LiveTvIcon from '@mui/icons-material/LiveTv'
import LocalBarIcon from '@mui/icons-material/LocalBar'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import MicIcon from '@mui/icons-material/Mic'
import MuseumIcon from '@mui/icons-material/Museum'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import NightsStayIcon from '@mui/icons-material/NightsStay'
import PaletteIcon from '@mui/icons-material/Palette'
import ParkIcon from '@mui/icons-material/Park'
import PetsIcon from '@mui/icons-material/Pets'
import PoolIcon from '@mui/icons-material/Pool'
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen'
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball'
import StorefrontIcon from '@mui/icons-material/Storefront'
import TerrainIcon from '@mui/icons-material/Terrain'
import WavesIcon from '@mui/icons-material/Waves'
import WbTwilightIcon from '@mui/icons-material/WbTwilight'
import WineBarIcon from '@mui/icons-material/WineBar'

export type ActivityIdeaIcon = {
  icon: React.ReactElement
  color: string
}

/** Couleurs claires : le thème de l'application est sombre */
const activityIdeaIcons: Record<string, ActivityIdeaIcon> = {
  boardGames: { icon: <CasinoIcon />, color: '#ce93d8' },
  cooking: { icon: <SoupKitchenIcon />, color: '#ffb74d' },
  movieNight: { icon: <LiveTvIcon />, color: '#4fc3f7' },
  puzzle: { icon: <ExtensionIcon />, color: '#81c784' },
  brunch: { icon: <BreakfastDiningIcon />, color: '#ffd54f' },
  karaoke: { icon: <MicIcon />, color: '#f06292' },
  picnic: { icon: <ParkIcon />, color: '#66bb6a' },
  walk: { icon: <DirectionsWalkIcon />, color: '#aed581' },
  sunset: { icon: <WbTwilightIcon />, color: '#ff8a65' },
  bike: { icon: <DirectionsBikeIcon />, color: '#4db6ac' },
  beach: { icon: <BeachAccessIcon />, color: '#fff176' },
  stars: { icon: <NightsStayIcon />, color: '#9fa8da' },
  exhibition: { icon: <PaletteIcon />, color: '#ba68c8' },
  museum: { icon: <MuseumIcon />, color: '#bcaaa4' },
  bookstore: { icon: <MenuBookIcon />, color: '#a1887f' },
  concert: { icon: <MusicNoteIcon />, color: '#f48fb1' },
  aquarium: { icon: <WavesIcon />, color: '#4dd0e1' },
  zoo: { icon: <PetsIcon />, color: '#ffcc80' },
  iceCream: { icon: <IcecreamIcon />, color: '#f8bbd0' },
  bakery: { icon: <BakeryDiningIcon />, color: '#ffca28' },
  cocktail: { icon: <LocalBarIcon />, color: '#ff7043' },
  coffee: { icon: <LocalCafeIcon />, color: '#bc8f6f' },
  wine: { icon: <WineBarIcon />, color: '#e57373' },
  market: { icon: <StorefrontIcon />, color: '#9ccc65' },
  bowling: { icon: <SportsBaseballIcon />, color: '#64b5f6' },
  escapeGame: { icon: <KeyIcon />, color: '#ffd740' },
  climbing: { icon: <TerrainIcon />, color: '#a5d6a7' },
  iceSkating: { icon: <IceSkatingIcon />, color: '#80deea' },
  miniGolf: { icon: <GolfCourseIcon />, color: '#69f0ae' },
  swimming: { icon: <PoolIcon />, color: '#42a5f5' },
}

export default activityIdeaIcons
