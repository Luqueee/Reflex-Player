
/** @jsxImportSource @emotion/react */import { Fragment, useCallback, useContext } from "react"
import { Fragment_fd0e7cb8f9fb4669a6805377d925fba0 } from "/utils/stateful_components"
import { Box, Button, ButtonGroup, Card, CardBody, CardHeader, Center, Heading, HStack, Image as ChakraImage, Input, List, ListItem, VStack } from "@chakra-ui/react"
import { EventLoopContext, StateContexts } from "/utils/context"
import { Event, getRefValue, getRefValues, isTrue, set_val } from "/utils/state"
import "focus-visible/dist/focus-visible"
import dynamic from "next/dynamic"
import NextHead from "next/head"

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });


export function Reactplayer_93c2bddad57c347126eb26c01da9cce6 () {
  const state__reproductor = useContext(StateContexts.state__reproductor)


  return (
    <ReactPlayer controls={true} css={{"display": "none"}} height={`auto`} loop={state__reproductor.loop} muted={state__reproductor.mute} playing={(state__reproductor.state === 1)} url={state__reproductor.cancion} volume={state__reproductor.volume} width={`400px`}/>
  )
}

export function Box_2ef74525967101a4438a826c876acaa5 () {
  
    const handleSubmit_577803c606cdc49a5c6e355628e4b5a3 = useCallback((ev) => {
        const $form = ev.target
        ev.preventDefault()
        const form_data = {...Object.fromEntries(new FormData($form).entries()), ...{}}

        addEvents([Event("state.reproductor.sendSong", {song:form_data})])

        if (false) {
            $form.reset()
        }
    })
    
  const [addEvents, connectError] = useContext(EventLoopContext);


  return (
    <Box as={`form`} onSubmit={handleSubmit_577803c606cdc49a5c6e355628e4b5a3}>
  <HStack>
  <Input name={`song name`} placeholder={`youtube song`} sx={{"position": "relative", "color": "white", "top": "-12", "left": "-50"}} type={`text`}/>
  <Button sx={{"position": "relative", "top": "-12", "left": "-50"}} type={`submit`}>
  {`search`}
</Button>
</HStack>
</Box>
  )
}

export function Button_15a5fd1968aa783193936776e340b0c2 () {
  const state__reproductor = useContext(StateContexts.state__reproductor)
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_a73bca4ebdc619756ee1d8ea77914b57 = useCallback((_e) => addEvents([Event("state.reproductor.changemute", {})], (_e), {}), [addEvents, Event])

  return (
    <Button onClick={on_click_a73bca4ebdc619756ee1d8ea77914b57} sx={{"position": "relative", "left": "-600px"}}>
  {state__reproductor.muteLogo}
</Button>
  )
}

export function Button_fc91d0eeb3aa91c6f2e9cc1060e746a2 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_6564589433772dd6542cc10e8e786b0f = useCallback((_e) => addEvents([Event("state.reproductor.changeVolume", {op:1})], (_e), {}), [addEvents, Event])

  return (
    <Button onClick={on_click_6564589433772dd6542cc10e8e786b0f} sx={{"position": "relative", "left": "-600px"}}>
  {`➕`}
</Button>
  )
}

export function Hstack_790fed3d3d592d68464ccdd3aea13eff () {
  const state__reproductor = useContext(StateContexts.state__reproductor)


  return (
    <HStack sx={{"backgroundColor": "black"}}>
  {`["<VStack>\n  {state__reproductor.tracklistbuttons.map((index, index_19c9d5df83aa0ad27beefbe9acafb08d) => (\n  <Button key={index_19c9d5df83aa0ad27beefbe9acafb08d} onClick={(_e) => addEvents([Event(\"state.reproductor.eliminate\", {namesong:index})], (_e), {})} size={\`xs\`} sx={{\"backgroundColor\": \"white\", \"color\": \"black\", \"marginTop\": \"10px\"}}>\n  {index}\n</Button>\n))}\n</VStack>"]`}
  <VStack sx={{"height": "100vh", "width": "200vh", "backgroundColor": "black", "zIndex": "2"}}>
  <Fragment_bc2fa13b5784a43a975894567fe2ae46/>
  <ChakraImage src={`/bg_video.gif`} sx={{"marginTop": "8vh", "borderRadius": "10px", "height": "80%"}}/>
  <ButtonGroup size={`lg`} variant={`ghost`}>
  <Button_ed950d0cf811d848f331c6d80a46f3e9/>
  <Button_97893fbe6aa68b0ca35378c81a7a4b0e/>
  <Button_59903caecd38218cd2eb0c23c7c07cb9/>
  <Button_811b22af6648fc789999af66c08d7003/>
  <Button_abfacfa723fabbfc892785318feeb746/>
  <Button_15a5fd1968aa783193936776e340b0c2/>
  <Button_fc91d0eeb3aa91c6f2e9cc1060e746a2/>
  <Button_fd0d0b6e71bb19a7d2e2175d2bb6b550/>
</ButtonGroup>
  <Box_2ef74525967101a4438a826c876acaa5/>
  <Reactplayer_93c2bddad57c347126eb26c01da9cce6/>
</VStack>
  <Card align={`left`} sx={{"backgroundColor": "black", "height": "100vh", "width": "100vh", "zIndex": "1"}}>
  <CardHeader>
  <Heading sx={{"position": "absolute", "left": "25vh", "top": "4px", "color": "#decdbe"}}>
  {`Track list`}
</Heading>
</CardHeader>
  <CardBody>
  <Center>
  <List spacing={`.25em`} sx={{"color": "white", "position": "absolute", "top": "50px"}}>
  <ListItem>
  <Vstack_cd6f0d00698c497f0e18e105c6932547/>
</ListItem>
</List>
</Center>
</CardBody>
</Card>
</HStack>
  )
}

export function Button_fd0d0b6e71bb19a7d2e2175d2bb6b550 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_1a216d50acbb158ef3e60ad525c151a3 = useCallback((_e) => addEvents([Event("state.reproductor.changeVolume", {op:-1})], (_e), {}), [addEvents, Event])

  return (
    <Button onClick={on_click_1a216d50acbb158ef3e60ad525c151a3} sx={{"position": "relative", "left": "-600px"}}>
  {`➖`}
</Button>
  )
}

export function Button_ed950d0cf811d848f331c6d80a46f3e9 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_f56674c05b3f98f84e777fa4e74ed6ab = useCallback((_e) => addEvents([Event("state.reproductor.nextSong", {previous:true})], (_e), {}), [addEvents, Event])

  return (
    <Button onClick={on_click_f56674c05b3f98f84e777fa4e74ed6ab} sx={{"position": "relative", "left": "450"}}>
  {`⏪`}
</Button>
  )
}

export function Button_59903caecd38218cd2eb0c23c7c07cb9 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_6eb747a4a5e12bc0a641ef65673fc806 = useCallback((_e) => addEvents([Event("state.reproductor.change", {value:0})], (_e), {}), [addEvents, Event])

  return (
    <Button onClick={on_click_6eb747a4a5e12bc0a641ef65673fc806} sx={{"position": "relative", "left": "450"}}>
  {`⏸️`}
</Button>
  )
}

export function Button_811b22af6648fc789999af66c08d7003 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_6d55e9ec501132f30e64b631b0fc0556 = useCallback((_e) => addEvents([Event("state.reproductor.changeLoop", {})], (_e), {}), [addEvents, Event])

  return (
    <Button onClick={on_click_6d55e9ec501132f30e64b631b0fc0556} sx={{"position": "relative", "left": "450"}}>
  {`🔁`}
</Button>
  )
}

export function Button_abfacfa723fabbfc892785318feeb746 () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_6af26c3935ee9db282b471f11553e70f = useCallback((_e) => addEvents([Event("state.reproductor.nextSong", {})], (_e), {}), [addEvents, Event])

  return (
    <Button onClick={on_click_6af26c3935ee9db282b471f11553e70f} sx={{"position": "relative", "left": "450"}}>
  {`⏩`}
</Button>
  )
}

export function Fragment_bc2fa13b5784a43a975894567fe2ae46 () {
  const state__reproductor = useContext(StateContexts.state__reproductor)
  const state__clock = useContext(StateContexts.state__clock)


  return (
    <Fragment>
  {isTrue(state__clock.state) ? (
  <Fragment>
  <HStack sx={{"paddingX": "2em", "color": "#decdbe"}}>
  <Heading>
  {state__clock.time_info["hour"]}
</Heading>
  <Heading>
  {`:`}
</Heading>
  <Heading>
  {state__clock.time_info["minute_display"]}
</Heading>
  <Heading>
  {`:`}
</Heading>
  <Heading>
  {state__clock.time_info["second_display"]}
</Heading>
  <Heading>
  {` - `}
</Heading>
  <Heading>
  {state__reproductor.nameSong}
</Heading>
</HStack>
</Fragment>
) : (
  <Fragment>
  <HStack/>
</Fragment>
)}
</Fragment>
  )
}

export function Vstack_cd6f0d00698c497f0e18e105c6932547 () {
  const state__reproductor = useContext(StateContexts.state__reproductor)
  const [addEvents, connectError] = useContext(EventLoopContext);


  return (
    <VStack>
  {state__reproductor.tracklistbuttons.map((index, index_19c9d5df83aa0ad27beefbe9acafb08d) => (
  <Button key={index_19c9d5df83aa0ad27beefbe9acafb08d} onClick={(_e) => addEvents([Event("state.reproductor.eliminate", {namesong:index})], (_e), {})} size={`xs`} sx={{"backgroundColor": "white", "color": "black", "marginTop": "10px"}}>
  {index}
</Button>
))}
</VStack>
  )
}

export function Button_97893fbe6aa68b0ca35378c81a7a4b0e () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_47e01c78b5bd5301708007f1a2a27327 = useCallback((_e) => addEvents([Event("state.reproductor.start", {})], (_e), {}), [addEvents, Event])

  return (
    <Button onClick={on_click_47e01c78b5bd5301708007f1a2a27327} sx={{"position": "relative", "left": "450"}}>
  {`▶`}
</Button>
  )
}

export default function Component() {

  return (
    <Fragment>
  <Fragment_fd0e7cb8f9fb4669a6805377d925fba0/>
  <Hstack_790fed3d3d592d68464ccdd3aea13eff/>
  <NextHead>
  <title>
  {`Reflex App`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
</NextHead>
</Fragment>
  )
}
