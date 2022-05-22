import request from '@/utils/request'

/**
 * 查询 spu 数据列表
 * @param page 页码
 * @param limit 显示条数
 * @param category3Id 三级分类 id
 * @returns {Promise}
 */
export function reqSpuList(page, limit, category3Id) {
  return request({ url: `/dev-api2/admin/product/${page}/${limit}`, method: 'get', params: { category3Id }})
}
