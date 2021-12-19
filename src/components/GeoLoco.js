import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StreetViewService } from '@react-google-maps/api'
import { BackTop, Button, Modal } from 'antd'

import {
  game as GAME_INIT,
  round as ROUND_INIT
} from '../constants/game'
import Street from './Street'
import GuessMap from './GuessMap'
import RoundResults from './RoundResults'
import usePosition from '../hooks/usePosition'
import useStreetViewSvc from '../hooks/useStreetViewSvc'
import areas from '../constants/areas'

const NEXT_ROUND_TEXT = 'Play next round'
const GAME_OVER_TEXT = 'See results'
const GO_UP = 'Up!'

const mapContainerStyle = {
  width: '100%',
  height: '800px'
}

const Page = styled.div`
  height: 1640px;
`

const GoUpButton = styled.div`
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: #1088e9;
  color: #fff;
  text-align: center;
  font-size: 14;
  z-index: 1000;
`
const getNewPolyKey = () => `poly-${Math.random() * 100}`

const ModalFooter = ({
  isLastRound,
  nextRoundText,
  gameOverText,
  onNextRoundClick,
  onGameOverClick
}) => (
  !isLastRound ? (
    <Button onClick={onNextRoundClick}>{nextRoundText}</Button>
  ) : (
    <Button onClick={onGameOverClick}>{gameOverText}</Button>
  )
)

ModalFooter.propTypes = {
  isLastRound: PropTypes.bool.isRequired,
  nextRoundText: PropTypes.string.isRequired,
  gameOverText: PropTypes.string.isRequired,
  onNextRoundClick: PropTypes.func.isRequired,
  onGameOverClick: PropTypes.func.isRequired
}

const GeoLoco = ({ google }) => {
  const randomAreaIndex = Math.floor(Math.random() * areas.length)
  const [site, setSite] = useState(areas[randomAreaIndex])
  const [guessMarker, setGuessMarker] = useState()
  const [game, setGame] = useState(GAME_INIT)
  const [showRoundsResultModal, setShowRoundResultsModal] = useState(false)
  const [polygon, setPolygon] = useState()
  const [polygonKey, setPolygonKey] = useState(getNewPolyKey())
  const [position, setRandomPosition] = usePosition()
  const [
    ,
    setStreetViewSvc,
    streetViewPosition,
    setNewStreetViewPosition
  ] = useStreetViewSvc()

  const isLastRound = game.rounds.length - 1 === game.maxRounds

  const onPolygonLoad = (newPolygon) => {
    setPolygon(newPolygon)
  }

  const onStreetViewServicesLoad = (streetViewServiceInstance) => {
    setStreetViewSvc(streetViewServiceInstance)
  }

  const onNextRoundClick = () => {
    setGame((startedGame) => ({
      ...startedGame,
      rounds: [
        ...startedGame.rounds,
        { ...ROUND_INIT },
      ]
    }))
    setShowRoundResultsModal(false)
  }

  const onGameOverClick = () => {
    console.log('game over')
  }

  useEffect(() => {
    if (polygon) {
      setRandomPosition(google, polygon)
    }
  }, [polygon])

  useEffect(() => {
    if (position) {
      setNewStreetViewPosition(position)
    }
  }, [position])

  useEffect(() => {
    setPolygonKey(getNewPolyKey())
    setSite(areas[randomAreaIndex])
  }, [game.rounds.length])

  return (
    <Page>
      {google && (
        <>
          <StreetViewService onLoad={onStreetViewServicesLoad} />
          {streetViewPosition && (
            <Street
              mapContainerStyle={mapContainerStyle}
              streetViewPosition={streetViewPosition}
              game={game}
            />
          )}
          <GuessMap
            google={google}
            mapContainerStyle={mapContainerStyle}
            polygonKey={polygonKey}
            onPolygonLoad={onPolygonLoad}
            position={position}
            setShowRoundResultsModal={setShowRoundResultsModal}
            setGame={setGame}
            round={game.rounds.length}
            setGuessMarker={setGuessMarker}
            guessMarker={guessMarker}
            site={site}
          />
        </>
      )}
      <BackTop>
        <GoUpButton>{GO_UP}</GoUpButton>
      </BackTop>
      <Modal
        visible={showRoundsResultModal}
        width="70%"
        footer={[
          <ModalFooter
            isLastRound={isLastRound}
            nextRoundText={NEXT_ROUND_TEXT}
            gameOverText={GAME_OVER_TEXT}
            onNextRoundClick={onNextRoundClick}
            onGameOverClick={onGameOverClick}
          />
        ]}
      >
        <RoundResults
          round={game.rounds[game.rounds.length - 1]}
          site={site}
          position={position}
          guessMarker={guessMarker}
        />
      </Modal>
    </Page>
  )
}

GeoLoco.propTypes = {
  google: PropTypes.shape({}).isRequired
}

export default GeoLoco
