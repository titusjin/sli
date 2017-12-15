import { errorLoading, loadRoute } from 'Utils/route-handler'

module.exports = [
  {
    path: '/landing',
    getComponent (location, cb) {
      System.import('Components/Landing')
            .then(loadRoute(cb)).catch(errorLoading)
    }
  },
  {
    path: '/amdin/manage',
    getComponent (location, cb) {
      System.import('Containers/AdminManage')
                .then(loadRoute(cb))
                .catch(errorLoading)
    }
  },
  // {
  //   path: '/form/diverRegist',
  //   getComponent (location, cb) {
  //     System.import(
  //               'Containers/RegistDiverForm'
  //           )
  //               .then(loadRoute(cb))
  //               .catch(errorLoading)
  //   }
  // }
]
