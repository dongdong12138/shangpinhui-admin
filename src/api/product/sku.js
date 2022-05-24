import request from '@/utils/request'

/**
 * 查询 sku 列表
 * @param page 页码
 * @param limit 每一页显示条数
 * @returns {Promise}
 */
export function reqSkuList(page, limit) {
  return request({ url: `/dev-api2/admin/product/list/${page}/${limit}`, method: 'get' })
}
