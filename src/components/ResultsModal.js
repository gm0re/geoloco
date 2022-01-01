import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'antd'

const NEW_GAME_TEXT = 'Play new game'
const NEXT_ROUND_TEXT = 'Play next round'
const GAME_OVER_TEXT = 'See results'

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

const ResultsModal = ({
  showRoundsResultModal,
  setShowRoundResultsModal,
  isLastRound,
  showGameResults,
  onNextRoundClick,
  onGameOverClick,
  onNewGameClick,
  children
}) => (
  <Modal
    visible={showRoundsResultModal}
    width="70%"
    onCancel={() => setShowRoundResultsModal(false)}
    footer={[
      <ModalFooter
        isLastRound={isLastRound}
        showGameResults={showGameResults}
        nextRoundText={NEXT_ROUND_TEXT}
        gameOverText={GAME_OVER_TEXT}
        newGameText={NEW_GAME_TEXT}
        onNextRoundClick={onNextRoundClick}
        onGameOverClick={onGameOverClick}
        onNewGameClick={onNewGameClick}
      />
    ]}
  >
    {children}
  </Modal>
)

ResultsModal.propTypes = {
  showRoundsResultModal: PropTypes.bool.isRequired,
  setShowRoundResultsModal: PropTypes.func.isRequired,
  isLastRound: PropTypes.bool.isRequired,
  showGameResults: PropTypes.bool.isRequired,
  onNextRoundClick: PropTypes.func.isRequired,
  onGameOverClick: PropTypes.func.isRequired,
  onNewGameClick: PropTypes.func.isRequired,
  children: PropTypes.node
}

ResultsModal.defaultProps = {
  children: undefined
}

export default ResultsModal
