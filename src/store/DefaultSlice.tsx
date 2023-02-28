import { createSlice } from '@reduxjs/toolkit'
import { parse, stringify } from 'yaml'

const defaultCustom = {
  default: {
    customization: {
      distribution_code_name: 'Weasel',
      distribution_version: '0.14.3_dev_0.8',
      generator: "Rime::SwitcherSettings",
      modified_time: "Mon Jan 30 22:32:13 2023",
      rime_version: '1.7.3',
    },
    patch: {
      'menu/page_size': 5,
      schema_list: [{ schema: 'luna_pinyin' }]
    }
  },
  schema: {
    simplified: false,
    inputMode: 'pinyin'
  },
  default_setting_changed: false
}

let fileHandle: FileSystemFileHandle | null

const defaultSlice = createSlice({
  name: 'default',
  initialState: defaultCustom,
  reducers: {
    saveDefaultCustomFileHandle: (state, actions) => {
      const { handle, json } = actions.payload
      console.log(handle);

      fileHandle = handle
      state.default = json
    },
    handleDefaultDrop: (state, actions) => {
      state.default = actions.payload
      // todo 需要在这里识别方案
      console.log(stringify(state));
    },
    changePageSize: (state, actions) => {
      // todo 需要想办法识别这种 / 语法
      state.default.patch['menu/page_size'] = actions.payload
      state.default_setting_changed = true
    },
    changeSimplified: (state, actions) => {
      state.default_setting_changed = true
      state.schema.simplified = actions.payload
      state.default.patch.schema_list = [indexSchema(`${state.schema.simplified}`, state.schema.inputMode as 'double_pinyin' | 'wubi' | 'pinyin')]
    },
    changeInputMode: (state, actions) => {
      state.default_setting_changed = true
      state.schema.inputMode = actions.payload
      state.default.patch.schema_list = [indexSchema(`${state.schema.simplified}`, state.schema.inputMode as 'double_pinyin' | 'wubi' | 'pinyin')]
    },
    saveDefaultSetting: (state) => {
      state.default.customization.modified_time = new Date().toLocaleString()
      const output = stringify(state.default)
      writeYAML(output, fileHandle!)
    },
  }
})


async function writeYAML(output: string, handle: FileSystemFileHandle) {
  const opts: FileSystemHandlePermissionDescriptor = { mode: "readwrite" };
  console.log('handle', handle);


  if (await handle.queryPermission(opts) !== 'granted'
    && (await handle.requestPermission(opts) !== 'granted')) {
    return
  }

  const writable = await handle.createWritable()
  await writable.write(output)
  await writable.close()
}

function indexSchema(simplified: 'true' | 'false', schema: 'double_pinyin' | 'wubi' | 'pinyin') {
  const schema_array = {
    'false': {
      double_pinyin: 'double_pinyin',
      wubi: 'wubi_trad',
      pinyin: 'luna_pinyin'
    },
    'true': {
      double_pinyin: 'double_pinyin', // todo 目前没有简体双拼
      wubi: 'wubi86',
      pinyin: 'pinyin_simp' // 袖珍拼音的词库比 luna 好
    }
  }

  return { schema: schema_array[simplified][schema] };
}


export const {
  handleDefaultDrop,
  changePageSize,
  saveDefaultCustomFileHandle,

  changeSimplified,
  changeInputMode,
  saveDefaultSetting
} = defaultSlice.actions;
export default defaultSlice;
