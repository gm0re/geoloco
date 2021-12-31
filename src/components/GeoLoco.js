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
import GameResults from './GameResults'
import usePosition from '../hooks/usePosition'
import useStreetViewSvc from '../hooks/useStreetViewSvc'
import countriesIndex from '../constants/countries/index.json'

const NEW_GAME_TEXT = 'Play new game'
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
  newGameText,
  showGameResults,
  onNextRoundClick,
  onGameOverClick,
  onNewGameClick
}) => (
  <>
    {!isLastRound && (
      <Button onClick={onNextRoundClick}>{nextRoundText}</Button>
    )}
    {isLastRound && !showGameResults && (
      <Button onClick={onGameOverClick}>{gameOverText}</Button>
    )}
    {showGameResults && (
      <Button onClick={onNewGameClick}>{newGameText}</Button>
    )}
  </>
)

ModalFooter.propTypes = {
  isLastRound: PropTypes.bool.isRequired,
  nextRoundText: PropTypes.string.isRequired,
  gameOverText: PropTypes.string.isRequired,
  newGameText: PropTypes.string.isRequired,
  showGameResults: PropTypes.bool.isRequired,
  onNextRoundClick: PropTypes.func.isRequired,
  onGameOverClick: PropTypes.func.isRequired,
  onNewGameClick: PropTypes.func.isRequired
}

const GeoLoco = ({ google }) => {
  const randomAreaIndex = Math.floor(Math.random() * countriesIndex.length)
  const [site, setSite] = useState()
  const [guessPosition, setGuessPosition] = useState()
  const [game, setGame] = useState(GAME_INIT)
  const [showRoundsResultModal, setShowRoundResultsModal] = useState(false)
  const [showGameResults, setShowGameResults] = useState(false)
  const [polygon, setPolygon] = useState()
  const [polygonKey, setPolygonKey] = useState(getNewPolyKey())
  const [position, setRandomPosition] = usePosition()
  const [
    ,
    setStreetViewSvc,
    streetViewPosition,
    setNewStreetViewPosition
  ] = useStreetViewSvc()

  const isLastRound = game.rounds.length === game.maxRounds

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
    setShowGameResults(true)
  }

  const onNewGameClick = () => {
    setGame(GAME_INIT)
    setShowGameResults(false)
    setShowRoundResultsModal(false)
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
    setPolygonKey(getNewPolyKey)

    if (randomAreaIndex) {
      fetch(`/countries/${countriesIndex[randomAreaIndex]}.json`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`)
          }
          return response.json()
        })
        .then(((countryBundles) => {
          console.log('country', countryBundles, randomAreaIndex, countriesIndex[randomAreaIndex])
          let selectedBundles = countryBundles
          // found a multi polygon country
          if (Array.isArray(countryBundles[0])) {
            // get one of the polygons randomly
            selectedBundles = countryBundles[Math.floor(Math.random() * countryBundles.length)]
          }
          setSite(selectedBundles)
        }))
        .catch((error) => {
          console.log(error)
        });
    }
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
          {site && (
            <GuessMap
              google={google}
              mapContainerStyle={mapContainerStyle}
              polygonKey={polygonKey}
              onPolygonLoad={onPolygonLoad}
              position={position}
              setShowRoundResultsModal={setShowRoundResultsModal}
              setGame={setGame}
              round={game.rounds.length}
              setGuessPosition={setGuessPosition}
              guessPosition={guessPosition}
              site={site}
            />
          )}
        </>
      )}
      <BackTop>
        <GoUpButton>{GO_UP}</GoUpButton>
      </BackTop>
      <Modal
        visible={showRoundsResultModal}
        width="70%"
        onCancel={() => setShowRoundResultsModal(false)}
        footer={[
          <ModalFooter
            isLastRound={isLastRound}
            nextRoundText={NEXT_ROUND_TEXT}
            showGameResults={showGameResults}
            gameOverText={GAME_OVER_TEXT}
            newGameText={NEW_GAME_TEXT}
            onNextRoundClick={onNextRoundClick}
            onGameOverClick={onGameOverClick}
            onNewGameClick={onNewGameClick}
          />
        ]}
      >
        {site && !showGameResults && (
          <RoundResults
            round={game.rounds[game.rounds.length - 1]}
            site={site}
            position={position}
            guessPosition={guessPosition}
            setGame={setGame}
          />
        )}
        {showGameResults && (
          <GameResults game={game} />
        )}
      </Modal>
    </Page>
  )
}

GeoLoco.propTypes = {
  google: PropTypes.shape({}).isRequired
}

export default GeoLoco
