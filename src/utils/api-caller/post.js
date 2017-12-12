import api from '../api'

export const addPostToLive = postId => {
  return api
        .fire({
          url: `${__IP__BACKEND_API}/ipbackend/discover/v0/TrendingFeed/addToLive/${postId}`,
          method: 'PUT'
        })
}
