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

/**
 * 保存或修改 spu
 * @param spuInfo spu 信息
 * @returns {Promise}
 */
export function reqSaveOrUpdateSpu(spuInfo) {
  if (spuInfo.id) {
    return request({ url: `/dev-api2/admin/product/updateSpuInfo`, method: 'post', data: spuInfo })
  } else {
    return request({ url: `/dev-api2/admin/product/saveSpuInfo`, method: 'post', data: spuInfo })
  }
}

/**
 * 删除 spu
 * @param spuId
 * @returns {Promise}
 */
export function reqDeleteSpu(spuId) {
  return request({ url: `/dev-api2/admin/product/deleteSpu/${spuId}`, method: 'delete' })
}

/**
 * 查询图片列表
 * @param spuId
 * @returns {Promise}
 */
export function reqSpuImageList(spuId) {
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

/**
 * 保存 sku
 * @param skuInfo
 * @returns {Promise}
 */
export function reqSaveSkuInfo(skuInfo) {
  return request({ url: `/dev-api2/admin/product/saveSkuInfo`, method: 'post', data: skuInfo })
}

/**
 * 获取 sku 列表
 * @param spuId
 * @returns {Promise}
 */
export function reqSkuList(spuId) {
  return request({ url: `/dev-api2/admin/product/findBySpuId/${spuId}`, method: 'get' })
}
