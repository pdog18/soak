# Soak 「润笔」

「不起個好名，寫碼興致索然。」 [——— by 山景答問](https://rime.im/blog/2016/04/14/qna-in-mtvu/)

用毛笔时直接蘸墨书写的效果并不是最好的，更好的做法是先用清水浸泡，即为「润笔」。

希望使「鼠须管」与「小狼毫」的上手变得更为舒适，起到先润笔再书写的效果。

--- 

### 使用方式：

 [在线使用](https://pdog18.github.io/soak/)



### TODO
- [ ] 符号界面
  - [ ] 中文模式下使用英文标点
  - [ ] 使用更直观的界面(键盘图)来进行符号编辑
  - [ ]  [符号大全] 
  - [ ] 智能调整数字后标点
- [ ] 指定应用中关闭中文模式
- [ ] 皮肤界面
  - [ ] 所见即所得的自定义界面
  - [ ] 夜间模式
- [ ] 按键设置
- [ ] 词典管理
  - [ ] 首选词
- [ ] 拼音模式下，是否开启模糊音
- [ ] 共享平台
  - [ ] 词库分享
  - [ ] 高级配置分享(?直接启动某人的配置，然后在配置上进行调整)
- [ ] 候选词横屏状态使用 ← 与 → 选词，而不是  ↑ 与 ↓
- [ ] Electron App 
  - [ ] 可以访问 Rime 文件夹，保存后自动部署。部署成功后展示输入框，用以测试本次的配置效果。
  


### Why
#### 为什么需要 Rime 文件夹？
1. 需要 `default.custom.yaml` 来读取 `page_size` 等已经存在的设置
2. 需要 `squirrel.custom.yaml(mac)/weasel.custom.yaml(win)` 来读取 `style/horizontal` 等已经存在的设置
3. 某些情况下需要 `installation.yaml` 来获取你是 `squirrel` 还是 `weasel`
4. 为什么需要拖入文件而不是使用 File System Access 的文件选择对话框呢？通常 Rime 文件夹存在 `...\AppData\Roaming\Rime` 中，在这类文件夹中的文件是无法通过 File System Access API 来获取的。所以需要使用拖入文件的方式。