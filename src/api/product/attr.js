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
