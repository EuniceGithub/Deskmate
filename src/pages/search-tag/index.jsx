/* eslint-disable react/no-unused-state */
import Taro ,{ getCurrentInstance }from '@tarojs/taro'
import { Component } from 'react'
import { View,Image, Input,Button} from '@tarojs/components'
import './index.css'
import backImg from '../../images/backImg2.png'
import searchImg from '../../images/search.png'
import Fetch from '../../service/fetch'
import Item from '../../Components/Item'
import Default from '../../images/default.jpg'

export default class Index extends Component {

    constructor(){
        super(...arguments);
        this.state = {
            avatar:Default,
            tag : '',           
            nickname : ' ',
            tag1 : '',
            tag2 : '',
            tag3 : '',
            tag4 : '',
            tag5 : '',
            declaration : '',
            college : '',
            major : '',
            grade : '',
            cards : [],
            persons : true,
            isNone: true,
            users_id : '',
            gettag:''
        }
    }

  componentWillMount () {
    const gettag = getCurrentInstance().router.params.gettag
    console.log(gettag);
    this.setState({
      tag:gettag
    })
   }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { 
    const {tag} = this.state;

    if(tag){
      console.log(111);
      Fetch(
        'api/v1/square/tag',
        {tag},
        'POST'
      ).then(
        res => {
          console.log(res);
          console.log(res.data);
          console.log(res.data[0]);
          if(res.code == 200){
            Taro.setStorage({
              key: 'tag',
              data: tag
            });
            console.log(999);
            this.setState({
              cards:res.data,
            });
          }else{
            Taro.showToast({
                icon: 'none',
                title: '搜索不到'
              });
         
          }             
          
        }
      ).catch(
        error => {
          console.log(error);
        }
      )
    }

    
  }

  componentDidHide () { }



  toSquaresearch(){
    Taro.redirectTo({
      url:'/pages/square-search/index'
    })
  }

  Backto(){
    Taro.redirectTo({
      url:'/pages/square-search/index'
    })
  }
  
  render () {
    const {cards,tag} = this.state;
    return (
        <View className='container'>
        <Button className='back'  plain  onClick={this.toSquaresearch.bind(this)} >
            <Image src={backImg} className='backImg' />
        </Button>
       <View className='search'> 
            <Image src={searchImg} className='searchImg'  />
       </View>       
      <Input  className='input' 
        placeholder={tag} placeholder-style='color:#FFFFFF' onclick={this.Backto.bind(this)}
      ></Input>
      
        
  

    <View className='showmore'>{cards.map(
    (card) => {
      return(
        <Item key='item' nickname={card.nickname} tag1={card.tag1} tag2={card.tag2} users_id={card.users_id}
          tag3={card.tag3} tag4={card.tag4} tag5={card.tag5} declaration={card.declaration} 
          college={card.college} major={card.major} grade={card.grade} avatar={card.avatar===''? Default:card.avatar}
        >
        </Item>
      )
    }
  )
    }</View>
  
  
      </View>
    )
  }
}