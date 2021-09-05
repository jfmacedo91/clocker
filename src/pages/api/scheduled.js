import { addHours, differenceInHours, format } from 'date-fns'

import firebaseServer from '../../services/firebaseServer'

const db = firebaseServer.firestore()
const profile = db.collection('profile')
const schedule = db.collection('schedule')
const startAt = new Date(2021, 1, 1, 8, 0)
const endAt = new Date(2021, 1, 1, 17, 0)
const totalHours = differenceInHours(endAt, startAt)
const timeBlocks = []
for(let blockIndex = 0; blockIndex <= totalHours; blockIndex++) {
  const time = format(addHours(startAt, blockIndex), 'HH:mm')
  timeBlocks.push(time)
}

export default async (req, res) => {
  try {
    // const profileDoc = await profile
    //   .where('username', '==', req.query.username)
    //   .get()
    // const snapshot = await schedule
    //   .where('userId', '==', profileDoc.userId)
    //   .where('when', '==', req.query.when)
    //   .get()
    return res.status(200).json(timeBlocks)
  } catch (error) {
    console.error(`FB ERRO: ${ error }`)
    return res.status(401)
  }
}