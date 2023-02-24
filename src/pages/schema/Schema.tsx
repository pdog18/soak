import React from 'react';
import { ClusterOutlined as InputTypeIcon, RetweetOutlined as SimpIcon } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeInputMode, changeSimplified } from '../../store/SchemaSlice';
import { RootState } from '../../store/store';
import RimeSettingItem from '../../components/RimeSettingItem';

const Schema: React.FC = () => {
  const schema = useSelector((state: RootState) => state.schema)
  const dispatch = useDispatch()

  return (<div style={{
    margin: '4vh 4vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px'
  }}>

    <RimeSettingItem
      title='简体/繁体'
      values={[true, false]}
      defaultValue={schema.simplified}
      names={['简体', '繁体']}
      onChange={(value: boolean) => {
        dispatch(changeSimplified(value))
      }} >
      <SimpIcon style={{ fontSize: '24px', margin: '0px 16px' }} />
    </RimeSettingItem>

    <RimeSettingItem
      title='输入模式'
      values={['pinyin', 'double_pinyin', 'wubi']}
      defaultValue={schema.inputMode}
      names={['拼音', '双拼', '五笔']}
      onChange={(value: string) => {
        dispatch(changeInputMode(value))
      }} >
      <InputTypeIcon style={{ fontSize: '24px', margin: '0px 16px' }} />
    </RimeSettingItem>

    {/* 具体方案 */}
    <div>当前方案</div>

    {/*  关闭方案选择快捷键( Control + Grave)        放到「按键管理」更合适？?  */}
    <div>更多方案</div>
  </div>);
}


export default Schema;