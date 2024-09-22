import React from 'react'
import QuestsButton from '../elements/QuestsButton'
import '@/app/styles/pages/quests.css';

const Quests = () => {
  return (
    <div className='quests-container'>
        <div className = "title">Daily tasks</div>
        <QuestsButton text = "Watch youtube" image = '/assets/images/icons/youtubeIcon.png' data={{quests_id: '1', quests_status: false}}/>
        {/* <QuestsButton text = "Follow us on Twitter" image = '/assets/images/icons/youtubeIcon.png' data={{quests_id: '2', quests_status: false}}  /> */}
        <div className = "title">Permanent tasks</div>
        <QuestsButton text = "Follow us on Twitter" image = '/assets/images/icons/Xsocial.png' data={{quests_id: '2', quests_status: false}} />
        <QuestsButton text = "Join our Telegram" image = '/assets/images/icons/telegram2.png' data={{quests_id: '4', quests_status: false}} />

    </div>
  )
}

export default Quests