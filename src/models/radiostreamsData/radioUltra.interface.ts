export interface IUltraInfo {
  id: string
  uniqueid: string
  last_modified: string
  artist: string
  title: string
  metadata: string
  album: string
  cover: string
  itunes_url: string
  youtube_url: string
  ytmusic_url: string
  yamusic_url: string
  spotify_url: string
  date: string
  time: string
  runtime: any
  next: any
  next_text: any
  cover_webp: string
  root: string
  prev_tracks: UltraTrack[]
}

export interface UltraTrack {
  uniqueid: string
  last_modified: string
  artist: string
  title: string
  date: string
  time: string
  cover: string
  cover_webp: string
  itunes_url: string
  youtube_url?: string
  ytmusic_url?: string
  yamusic_url: string
  spotify_url: string
}
