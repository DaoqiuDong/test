import request from '@/utils/request'
export function listByProject(projectId) {
  return request({
    url: '/api/investigation/listByProject/' + projectId,
    method: 'post'
  })
}

export function del(projectId,id) {
  return request({
    url: '/api/investigation/del/' + projectId+"/"+id,
    method: 'post'
  })
}
