import { AbilityBuilder, Ability } from '@casl/ability'
import * as performance from './performance'
import * as libs from './libs'

export const ability = new Ability()

export function abilityHelper(permissions, additional = false) {
  let ability_ = new AbilityBuilder()
  if (additional) {
    ability_ = ability
  }
  const userPermissions = permissions
  userPermissions.map((key) => ability_.can('access', key))
  ability.update(ability_.rules)
}

/**
 * "If the user has the permission to perform the action on the entity, return
 * true, otherwise return false."
 *
 * The function takes four arguments:
 *
 * * `typeAction`: The action the user wants to perform.
 * * `entity`: The entity the user wants to perform the action on.
 * * `WhoImUser`: The user who wants to perform the action.
 * * `can`: A function that checks if the user has the permission to perform the
 * action
 * @param [typeAction] - The type of action you want to check.
 * @param [entity] - the entity you want to check permissions for
 * @param [can] - the function that checks if the user has the permission
 * @returns A function that takes in 4 parameters and returns a boolean.
 */
export function CanActionOnEntity(typeAction, entity, can, tryAllDeep = true) {
  const nested = NestedPerformancePermissions['performance']
  if (!nested) return

  if (typeof typeAction !== 'string') return
  let typeSubAction
  if (typeAction.includes('_')) {
    typeSubAction = typeAction.split('_')[1]
    typeAction = typeAction.split('_')[0]
  }

  const transformIng = (i) => {
    if (typeof i === 'string') return i
    else {
      delete i['_key']
      return Object.keys(i)
        .map((key) => i[key])
        .join('')
    }
  }

  // if the entity has Permissions
  const permissions =
    'permissions' in entity && Array.isArray(entity.permissions)
      ? entity.permissions
      : []

  const ePermissions = []
  if (permissions.length > 0) {
    ePermissions.push(...permissions.map((i) => transformIng(i)))
  }

  const entityType = entity.entityType || null
  const entityClass = entity.entityClass || null

  let eType = entityType
  if (entityType === 'key-result') eType = 'keyResult'

  const eTypeClassAction =
    nested[eType][entityClass] !== undefined
      ? performance[nested[eType][entityClass][typeAction]?._key]
      : null

  const nestedDeepKeys = {
    eTypeAction: performance[nested[eType][typeAction]?._key],
    eTypeSubAction: typeSubAction
      ? performance[nested[eType][typeAction][typeSubAction]?._key]
      : null,
    eTypeClassAction: entityClass ? eTypeClassAction : null,
    eTypeClassSubAction:
      entityClass && typeSubAction
        ? performance[
            nested[eType][entityClass][typeAction][typeSubAction]?._key
          ]
        : null,
  }

  // check if the user has the permission or if the entity has the permission
  const PermissionsOrCanByKey = (key) => {
    if (ePermissions.includes(key)) return true
    return can('access', key)
  }

  // permissions checking start!
  const keys = Object.keys(nestedDeepKeys)
  for (const key of keys) {
    if (
      (!tryAllDeep && typeSubAction && !key.includes('SubAction')) ||
      (!tryAllDeep && !typeSubAction && key.includes('SubAction'))
    )
      continue

    if (nestedDeepKeys[key]) {
      if (PermissionsOrCanByKey(nestedDeepKeys[key])) return true
    }
  }

  return false
}

const NestedPerformancePermissions = Object.keys({ ...performance }).reduce(
  (acc, key) => {
    const nestedPermissions = libs.esplitUnderlineToObjectNested(key)
    return libs.ObjMergeRecursive(acc, nestedPermissions)
  },
  {}
)

export * from './performance'
