import api from './api'
import urlencode from 'urlencode'

export const fetchMediaByPostId = (postId) => {
    // let encodePostids = {};
    // encodePostids["postId"] = postId;
    // encodePostids = urlencode.encode(JSON.stringify(encodePostids));

  return api.fire({
    url: `${__IP__BACKEND_API}/ipbackend/discover/v0/post/getMedia/${postId}`,
    method: 'GET',
    headers: {'Authorization': localStorage.getItem('token')}
  })
}
