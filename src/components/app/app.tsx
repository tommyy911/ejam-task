import React, { FC, useState, useReducer, Reducer } from 'react';
import styles from './app.module.scss';

import { Nav } from '../nav';
import { TabType } from '../nav/tab'
import { Item } from '../item';
import { Form } from '../form';
import { OrderList } from '../order-list';
import { Row } from '../rwd/row';
import { Columns } from '../rwd/columns';
import { DynamicBar } from '../dynamic-bar';
import { connect, RootStateOrAny } from 'react-redux';
import { getIpAddressThunk } from '../../store-config/thunks/getIpAddress';
import { IpAddressType, ActionType } from '../../store-config/reducers';

const UPDATE_TAB_DATA = 'UPDATE_TAB_DATA'

type Props = {
  getIpAddress: () => void,
  location: IpAddressType
};

type TabStateType = {
  tabs: TabType[],
  activeTab: TabType
}

const tabReducer = (state: TabStateType, action: ActionType) => {
  switch (action.type) {
    case UPDATE_TAB_DATA:
      return { ...state, ...action.payload }
    default:
      throw new Error()
  }
}

const defaultTabs = [
  {
    id: 1,
    name: 'Check out',
    isActive: true,
  },
  {
    id: 2,
    name: 'Previous orders',
    isActive: false,
  },
]
const AppComponent: FC<Props> = ({ getIpAddress, location }) => {
  const [tabsData, dispatchTabData] = useReducer<Reducer<TabStateType, ActionType>>(tabReducer, {
    tabs: defaultTabs,
    activeTab: defaultTabs[0]
  })
  const { tabs, activeTab } = tabsData;
  const [isBarVisible, setBarVisibility] = useState(false);

  const handleTabChange = (tab: TabType) => {
    const copyTabs = tabs.slice().map((t) => ({
      ...t,
      isActive: t.id === tab.id
    }))
    dispatchTabData({
      type: UPDATE_TAB_DATA,
      payload: {
        activeTab: tab,
        tabs: copyTabs
      }
    })
  }

  const handleToggleFormBar = () => {
    if (!isBarVisible) {
      handleProceedToPurchase()
    } else {
      setBarVisibility(false)
    }
  }
  const handleProceedToPurchase = () => {
    if (!location) {
      getIpAddress()
    }
    setBarVisibility(true)
  }
  return (
    <div className={styles.mainContainer}>
      <Nav tabs={tabs} handleTabChange={handleTabChange} />
      {
        activeTab.id === 2 &&
        (
          <section className={styles.viewContainer}>
            <OrderList />
          </section>
        )
      }
      {
        activeTab.id === 1 &&
        (
          <section className={styles.viewContainer}>
            <Row>
              <Columns xs={12}>
                <Item handleProceedToPurchase={handleProceedToPurchase} />
              </Columns>
            </Row>
            <Row>
              <Columns xs={12}>
                <DynamicBar
                  title="Delivery data"
                  isVisible={isBarVisible}
                  handleToggle={handleToggleFormBar}
                >
                  <Form />
                </DynamicBar>
              </Columns>
            </Row>
          </section>
        )
      }
    </div>
  );

}

const mapStateToProps = (state: RootStateOrAny) => ({
  location: state.location
})

const mapDispathToProps = {
  getIpAddress: getIpAddressThunk
}

export const App = connect(mapStateToProps, mapDispathToProps)(AppComponent)