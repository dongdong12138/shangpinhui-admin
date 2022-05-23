import request from '@/utils/request'

/**
 * 查询图片列表
 * @param spuId
 * @returns {Promise}
 */
export function reqImageList(spuId) {
  return request({ url: `/dev-api2/admin/product/spuImageList/${spuId}`, method: 'get' })
}

/**
 * 查询销售属性列表
 * @param spuId
 * @returns {Promise}
 */
export function reqSaleAttrList(spuId) {
  return request({ url: `/dev-api2/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })
}

/**
 * 查询属性列表
 * @param category1Id
 * @param category2Id
 * @param category3Id
 * @returns {Promise}
 */
export function reqAttrInfoList(category1Id, category2Id, category3Id) {
  return request({ url: `/dev-api2/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })
}
