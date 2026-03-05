// 定义组件模块的类型，它具有一个可选的 'default' 属性，该属性是一个Vue组件
interface ComponentModule {
  default?: any; // 在实际项目中，可以替换为更具体的类型如 import type { DefineComponent } from 'vue'
}

// 使用泛型来定义 `import.meta.glob` 的返回类型，确保 `files` 对象的值是 `ComponentModule`
const files: Record<string, ComponentModule> = import.meta.glob('../view/*.vue', { eager: true });

/**
 * 注册所有匹配到的 Vue 组件到应用实例上
 * @param app - Vue 应用实例
 */
export default function install(app: any): void { // `app` 参数的类型通常为 `App<any>`，需要导入 `import { App } from 'vue'`
  Object.keys(files).forEach(key => {
    const component = files[key]?.default;
    // 计算组件名：提取文件路径中的文件名（不含扩展名）
    // 例如: '../view/MyComponent.vue' -> 'MyComponent'
    const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
    
    // 如果组件存在，则注册到app上
    if (component) {
      app.component(name, component);
    }
  });
}