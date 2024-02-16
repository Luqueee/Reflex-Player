import { createContext, useContext, useMemo, useReducer, useState } from "react"
import { applyDelta, Event, hydrateClientStorage, useEventLoop, refs } from "/utils/state.js"

export const initialState = {"state": {"is_hydrated": false, "router": {"session": {"client_token": "", "client_ip": "", "session_id": ""}, "headers": {"host": "", "origin": "", "upgrade": "", "connection": "", "pragma": "", "cache_control": "", "user_agent": "", "sec_websocket_version": "", "sec_websocket_key": "", "sec_websocket_extensions": "", "accept_encoding": "", "accept_language": ""}, "page": {"host": "", "path": "", "raw_path": "", "full_path": "", "full_raw_path": "", "params": {}}}}, "state.clock": {"running": true, "state": false, "zone": "Europe/Paris"}, "state.reproductor": {"cancion": "https://www.youtube.com/watch?v=AjrBn09nHis&ab_channel=DavilesdeNoveldaVEVO", "intensidad": 10000, "intensidad_maxima": 10000, "length_song": 0, "loop": true, "loopLogo": "🔁", "mute": false, "muteLogo": "🔊", "muteLogoMuted": "🔇", "muteLogoUnmuted": "🔊", "nameSong": "daviles de novela", "posActual": 0, "running": false, "state": 0, "time_song": 0, "tracklist": ["https://www.youtube.com/watch?v=AjrBn09nHis&ab_channel=DavilesdeNoveldaVEVO", "https://www.youtube.com/watch?v=l-2hOKIrIyI&ab_channel=AltheaGianera"], "tracklistbuttons": ["daviles de novela", "lofi song"], "urlSong": "", "volume": 1}}

export const ColorModeContext = createContext(null);
export const UploadFilesContext = createContext(null);
export const DispatchContext = createContext(null);
export const StateContexts = {
  state: createContext(null),
  state__clock: createContext(null),
  state__reproductor: createContext(null),
}
export const EventLoopContext = createContext(null);
export const clientStorage = {"cookies": {"state.clock.zone": {"path": "/", "sameSite": "lax"}}, "local_storage": {}}

export const onLoadInternalEvent = () => [Event('state.on_load_internal')]

export const initialEvents = () => [
    Event('state.hydrate', hydrateClientStorage(clientStorage)),
    ...onLoadInternalEvent()
]

export const isDevMode = true

export function UploadFilesProvider({ children }) {
  const [filesById, setFilesById] = useState({})
  refs["__clear_selected_files"] = (id) => setFilesById(filesById => {
    const newFilesById = {...filesById}
    delete newFilesById[id]
    return newFilesById
  })
  return (
    <UploadFilesContext.Provider value={[filesById, setFilesById]}>
      {children}
    </UploadFilesContext.Provider>
  )
}

export function EventLoopProvider({ children }) {
  const dispatch = useContext(DispatchContext)
  const [addEvents, connectError] = useEventLoop(
    dispatch,
    initialEvents,
    clientStorage,
  )
  return (
    <EventLoopContext.Provider value={[addEvents, connectError]}>
      {children}
    </EventLoopContext.Provider>
  )
}

export function StateProvider({ children }) {
  const [state, dispatch_state] = useReducer(applyDelta, initialState["state"])
  const [state__clock, dispatch_state__clock] = useReducer(applyDelta, initialState["state.clock"])
  const [state__reproductor, dispatch_state__reproductor] = useReducer(applyDelta, initialState["state.reproductor"])
  const dispatchers = useMemo(() => {
    return {
      "state": dispatch_state,
      "state.clock": dispatch_state__clock,
      "state.reproductor": dispatch_state__reproductor,
    }
  }, [])

  return (
    <StateContexts.state.Provider value={ state }>
    <StateContexts.state__clock.Provider value={ state__clock }>
    <StateContexts.state__reproductor.Provider value={ state__reproductor }>
      <DispatchContext.Provider value={dispatchers}>
        {children}
      </DispatchContext.Provider>
    </StateContexts.state__reproductor.Provider>
    </StateContexts.state__clock.Provider>
    </StateContexts.state.Provider>
  )
}