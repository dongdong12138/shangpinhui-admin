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

/**
 * 查询 spu 信息
 * @param spuId
 * @returns {Promise}
 */
export function reqSpu(spuId) {
  return request({ url: `/dev-api2/admin/product/getSpuById/${spuId}`, method: 'get' })
}

/**
 * 查询品牌列表
 * @returns {Promise}
 */
export function reqTrademarkList() {
  return request({ url: `/dev-api2/admin/product/baseTrademark/getTrademarkList`, method: 'get' })
}

/**
 * 查询 spu 图片列表
 * @param spuId
 * @returns {Promise}
 */
export function reqImageList(spuId) {
  return request({ url: `/dev-api2/admin/product/spuImageList/${spuId}`, method: 'get' })
}

/**
 * 查询属性列表
 * @returns {Promise}
 */
export function reqAttrList() {
  return request({ url: `/dev-api2/admin/product/baseSaleAttrList`, method: 'get' })
}
