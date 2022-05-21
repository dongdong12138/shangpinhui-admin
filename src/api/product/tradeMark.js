import request from '@/utils/request'

/**
 * 查询品牌列表
 * @param page 当前页码
 * @param limit 展示数据条数
 * @returns {Promise}
 */
export function reqTradeMarkList(page, limit) {
  return request({
    url: `/dev-api2/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
  })
}
