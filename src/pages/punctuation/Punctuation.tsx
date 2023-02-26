import React from 'react';
import { FloatButton, Table, Tag } from 'antd'
import Tags, { AddTag } from './Tags';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { PunctuType, savePunctuSetting } from '../../store/PunctuSlice';


const Punctuation: React.FC = () => {
  const state = useSelector((state: RootState) => state.punctu)
  const punctuArray = state.punctuArray
  const dispatch = useDispatch()

  const columns = [
    {
      title: '符号',
      dataIndex: 'name',
      align: 'center' as const,
      width: 100,
      render: (item: any, record: PunctuType) => (<Tag
        style={{ width: '24px', textAlign: 'center' }}>{record.name}
      </Tag>)
    },
    {
      title: '英文模式',
      width: 100,
      align: 'center' as const,
      dataIndex: 'ascii_style',
      render: (item: any, record: PunctuType) => (<Tag style={{ width: '24px', textAlign: 'center' }}>
        {record.ascii_style['commit'] ? record.ascii_style['commit'] : record.name}
      </Tag>)
    },
    {
      title: '中文半角',
      align: 'center' as const,
      dataIndex: 'half_shape',
      render: (item: any, record: PunctuType) => (<>
        <Tags item={item} record={record} type='half_shape' />
        <AddTag item={item} record={record} type='half_shape' />
      </>)
    },
    {
      title: '中文全角',
      align: 'center' as const,
      dataIndex: 'full_shape',
      render: (item: any, record: PunctuType) => (<>
        <Tags item={item} record={record} type='full_shape' />
        <AddTag item={item} record={record} type='full_shape' />
      </>)
    },
  ];


  return (
    <>

      <Table
        style={{ margin: '4vh 4vw' }}
        dataSource={punctuArray}
        columns={columns}
        pagination={false}
        scroll={{
          y: 360,
        }}
      />


      <FloatButton
        style={{ display: state.setting_changed ? 'block' : 'none' }}
        type="primary"
        tooltip={<div>Save</div>}
        onClick={() => dispatch(savePunctuSetting())} />
    </>);

}

export default Punctuation;