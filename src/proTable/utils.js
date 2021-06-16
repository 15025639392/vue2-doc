import {
  middlelineToCamelCase,
  isArray,
  hasOwnProperty,
  isObject,
  isFn
} from "../utils";

function getCurrentIcon(obj) {
  const hasIcon = hasOwnProperty(obj, "icon");
  if (!hasIcon) {
    return false;
  }
  return obj.icon.includes("-") ? obj.icon : `el-icon-${obj.icon}`;
}

// 计算按钮 操作按钮区域宽度, 使用记忆函数，减少计算次数(每当数据变动就重新计算，这是正常逻辑，所以不使用记忆函数)
// 有一种情况是，按钮个数和当前列表数据关联，所以正确的宽度是，当前页面按钮最多的情况下，操作区域的宽度（这种情况，每次数据变动都必须重新计算）
// 直接用dataSource来计算 而不是在渲染时计算
function calcAction(dataSource, actions, permissions, permissionsReqiured) {
  const hasPermission = permissionsReqiured !== false ? permissions : false;
  if ((!hasPermission && !dataSource) || !dataSource.length || !actions) {
    return {
      width: null,
      actions: []
    };
  }
  // 取当前页面，按钮数最多的用于计算
  const widthArr = [];
  const actionsArr = [];
  dataSource.forEach((item, index) => {
    // 预执行 按钮组
    const isArrayAction = isArray(actions);
    let width = 0;
    const fixedConfig = (actionsArr[index] = []);
    if (isArrayAction) {
      actions.forEach(action => {
        if (hasPermission && !permissions[action.action]) {
          return;
        }
        const newAction = getFixedAction(action, item);
        if (!newAction) return;
        if (action.show) {
          const show = action.show(item);
          if (show) {
            fixedConfig.push(newAction);
            width += newAction.width;
          }
          return;
        }
        fixedConfig.push(newAction);
        width += newAction.width;
      });
    }
    widthArr.push(width);
  });
  const width = Math.max(...widthArr);
  return {
    width: width,
    actions: actionsArr
  };
}

function getFixedAction(action, item) {
  const { dropdownMenu, ...rest } = action;
  if (action.type !== "dropdown") {
    return {
      ...action,
      disabled: isFn(action.disabled) ? action.disabled(item) : action.disabled,
      width: 62
    };
  }
  if (!dropdownMenu || !dropdownMenu.length) {
    return null;
  }
  const children = dropdownMenu
    .filter(r => {
      // 这里过滤了非show的下拉按钮，所以对应表格中的判断可以省略
      if (r.show) {
        return r.show(item);
      }
      return true;
    })
    .map(r => {
      return {
        ...r,
        disabled: isFn(r.disabled) ? r.disabled(item) : r.disabled
      };
    });
  // 这里计算了最终的下啦按钮组配置
  return children.length
    ? {
        ...rest,
        width: 80,
        dropdownMenu: children
      }
    : null;
}

// 不能实现
function getCurrentParent(scope) {
  if (scope.$parent) {
    return scope.$parent;
  }
}

export {
  middlelineToCamelCase,
  isArray,
  hasOwnProperty,
  isObject,
  isFn,
  calcAction,
  getCurrentIcon
};
