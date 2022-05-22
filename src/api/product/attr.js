import request from '@/utils/request'

/**
 * 查询一级分类
 * @returns {Promise}
 */
export function reqCategory1() {
  return request({ url: `/dev-api2/admin/product/getCategory1`, method: 'get' })
}

/**
 * 查询二级分类
 * @param category1Id 一级分类 id
 * @returns {Promise}
 */
export function reqCategory2(category1Id) {
  return request({ url: `/dev-api2/admin/product/getCategory2/${category1Id}`, method: 'get' })
}

/**
 * 查询三级分类
 * @param category2Id 二级分类 id
 * @returns {Promise}
 */
export function reqCategory3(category2Id) {
  return request({ url: `/dev-api2/admin/product/getCategory3/${category2Id}`, method: 'get' })
}

/**
 * 查询商品属性信息
 * @param category1Id 一级分类 id
 * @param category2Id 二级分类 id
 * @param category3Id 三级分类 id
 * @returns {Promise}
 */
export function reqAttrInfoList(category1Id, category2Id, category3Id) {
  return request({ url: `/dev-api2/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })
}

/**
 * 保存商品属性信息
 * @param attrInfo 属性信息
 * @returns {Promise}
 */
export function reqSaveAttrInfo(attrInfo) {
  return request({ url: `/dev-api2/admin/product/saveAttrInfo`, method: 'post', data: attrInfo })
}
