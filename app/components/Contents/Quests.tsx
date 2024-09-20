import React from 'react'
import QuestsButton from '../elements/QuestsButton'


const Quests = () => {
  return (
    <div className='quests-container'>
        Daily task
        <QuestsButton text = "Watch youtube" data={{quests_id: '1', quests_status: false}}/>
        <QuestsButton />
        Daily task
        <QuestsButton text = "Follow us on Twitter" data={{quests_id: '2', quests_status: false}} />
        <QuestsButton text = "Like Avalorians on Facebook" data={{quests_id: '3', quests_status: false}} />
        <QuestsButton text = "Subscribe to our Telegram" data={{quests_id: '4', quests_status: false}} />

    </div>
  )
}

export default Quests