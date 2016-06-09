import superagent from 'superagent'
import requestPromisePlugin from 'superagent-promise-plugin'

const request = requestPromisePlugin.patch(superagent)

export default request
