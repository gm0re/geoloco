import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StreetViewService } from '@react-google-maps/api'
import { Button, Spin } from 'antd'
import { v4 as uuid } from 'uuid'

import useQueryParam from '../hooks/useQueryParam'
import useGame from '../hooks/useGame'
import useSite from '../hooks/useSite'
import usePosition from '../hooks/usePosition'
import useStreetView from '../hooks/useStreetView'
import Street from './Street'
import GuessMap from './GuessMap'
import RoundResults from './RoundResults'
import GameResults from './GameResults'
import ResultsModal from './ResultsModal'

const GO_GUESS_TEXT = 'Go Guess'
const GO_BACK_TO_TOP = 'Go back to street'

const mapContainerStyle = {
  width: '100%',
  height: '800px'
}

const Page = styled.div`
  height: 1640px;
  width: 100%;
`

const GoGuessButton = styled(Button)`
  position: absolute;
  bottom: 24px;
  right: 64px;
  margin: 8px;
  z-index: 1000;
`
const GoBackToTop = styled(Button)`
  position: absolute;
  bottom: 24px;
  right: 64px;
  margin: 8px;
  z-index: 1000;
`

const StreetWrapper = styled.div`
  position: relative;
`

const GuessMapWrapper = styled.div`
  position: relative;
`

const getNewPolyKey = () => `poly-${uuid()}`

const GeoLoco = ({ google }) => {
  const query = useQueryParam()
  const countriesNames = query.get('countries')
  const selectedCountries = countriesNames && countriesNames.split(',')

  const [site, setRandomSite] = useSite(selectedCountries)
  const [guessPosition, setGuessPosition] = useState()
  const [
    game,
    setNewGame,
    setStartedRound,
    setNewRound
  ] = useGame()
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
  ] = useStreetView()

  const streetRef = useRef()
  const guessMapRef = useRef()

  const isLastRound = game.rounds.length === game.maxRounds

  const onPolygonLoad = (newPolygon) => {
    setPolygon(newPolygon)
  }

  const onStreetViewServicesLoad = (streetViewServiceInstance) => {
    setStreetViewSvc(streetViewServiceInstance)
  }

  const onNextRoundClick = () => {
    setNewRound()
    setShowRoundResultsModal(false)
  }

  const onGameOverClick = () => {
    setShowGameResults(true)
  }

  const onNewGameClick = () => {
    setNewGame()
    setShowGameResults(false)
    setShowRoundResultsModal(false)
  }

  const onGoGuessClick = () => {
    guessMapRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const onGoBackToTopClick = () => {
    streetRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const isLoading = () => (
    !google
    || !streetViewPosition
    || !polygon
    || !site
    || !position
  )

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
    if (streetViewPosition) {
      setStartedRound({ position: streetViewPosition })
      onGoBackToTopClick()
    }
  }, [streetViewPosition])

  useEffect(() => {
    setGuessPosition()
    setPolygon()
    setPolygonKey(getNewPolyKey)
    setRandomSite()
    setNewStreetViewPosition()
  }, [game.rounds.length])

  // debugging game:
  useEffect(() => {
    console.log('game', game)
  }, [game])

  return (
    <Page>
      {google && (
        <Spin spinning={isLoading()} size="large">
          <StreetWrapper ref={streetRef}>
            <StreetViewService onLoad={onStreetViewServicesLoad} />
            {streetViewPosition && (
              <Street
                mapContainerStyle={mapContainerStyle}
                streetViewPosition={streetViewPosition}
                game={game}
              />
            )}
            <GoGuessButton onClick={onGoGuessClick}>{GO_GUESS_TEXT}</GoGuessButton>
          </StreetWrapper>
          <GuessMapWrapper ref={guessMapRef}>
            {site && (
              <GuessMap
                google={google}
                mapContainerStyle={mapContainerStyle}
                polygonKey={polygonKey}
                onPolygonLoad={onPolygonLoad}
                position={game.rounds[game.rounds.length - 1].position}
                setShowRoundResultsModal={setShowRoundResultsModal}
                setStartedRound={setStartedRound}
                round={game.rounds.length}
                setGuessPosition={setGuessPosition}
                guessPosition={guessPosition}
                site={site}
              />
            )}
            <GoBackToTop onClick={onGoBackToTopClick}>{GO_BACK_TO_TOP}</GoBackToTop>
          </GuessMapWrapper>
        </Spin>
      )}
      <ResultsModal
        showRoundsResultModal={showRoundsResultModal}
        setShowRoundResultsModal={setShowRoundResultsModal}
        isLastRound={isLastRound}
        showGameResults={showGameResults}
        onNextRoundClick={onNextRoundClick}
        onNewGameClick={onNewGameClick}
        onGameOverClick={onGameOverClick}
      >
        {showGameResults ? (
          <GameResults game={game} google={google} />
        ) : (
          <RoundResults
            google={google}
            round={game.rounds[game.rounds.length - 1]}
            site={site}
            position={game.rounds[game.rounds.length - 1].position}
            guessPosition={guessPosition}
          />
        )}
      </ResultsModal>
    </Page>
  )
}

GeoLoco.propTypes = {
  google: PropTypes.shape({}).isRequired
}

export default GeoLoco
