import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Button, StyledButton } from "../index";

const stories = storiesOf('Button Test', module)
stories.add('Test', () => { //works like a react component in here (useState etc.)
    const [num, setnum] = useState(0)
    const [is_clicked, setis_clicked] = useState(false)
    const [isFreeze, setisFreeze] = useState(false)
    return <div className='ml-32 flex'>
        {/* <Button

            click={() => setis_clicked(true)}
            freeze
            // isClicked={is_clicked}
            c_shadows={[['active:shadow-inner-xl'],['', 'shadow-3xl hover:shadow-none', 'shadow-none'],[]]}
            c_con={['m-20 ring-blue-500', 'ring-0 shadow-none active:ring-4', 'ring-4']}
            c_wrap={['ring-white', 'ring-0 active:ring-2', 'ring-2']}
            c_w_h_r_d={['h-32 w-32 rounded-3xl duration-300']}
            c_={[
                'border-2 border-blue-500',
                'bg-gray-900 bg-opacity-100 active:bg-opacity-0',
                'bg-white bg-opacity-100'
            ]}
        >0
        </Button> */}


        {/* <StyledButton
            click={() => setnum(num+1)}
            freeze
            c_w_h_r_d={{ base: 'h-32 w-32 rounded-2xl duration-300' }}
            c_out={{ base: 'm-20' }}
            c_mid={{ base: 'ring-2' }}
            c_inn={{ base: 'bg-yellow-300 border-4 border-blue-800 ', noC: '', isC: '', dis:'' }}
            c_shadow={{ var: 7 }}
                >0
        </StyledButton>
        <Button
            click={() => setnum(num+1)}
            freeze
            c_w_h_r_d={{ base: 'h-32 w-32 duration-300' }}
            c_out={{ base: 'm-20' }}
            c_mid={{ base: '', noC: '', isC: '', dis:'' }}
            c_inn={{ base: 'bg-gradient-to-b from-lime-200 to-lime-400 active:shadow-inner-xl', noC: '', isC: '', dis:'' }}
                >0
        </Button>
        <StyledButton
            click={() => setnum(num+1)}
            // mouseIn={() => {}}
            // mouseOut={() => {}}
            // isClicked={false}
            // disabled
            freeze
            c_w_h_r_d={{ base: 'h-32 w-64 duration-300', noC: '', isC: '', dis:'' }}
            c_out={{ base: ' m-20', noC: '', isC: '', dis:'' }}
            // c_mid={{ base: 'bg-green-500', noC: '', isC: '', dis:'' }}
            // c_inn={{ base: 'bg-cyan-300', noC: '', isC: '', dis:'' }}
            c_shadow={{ var: 5 }}
            var={{ shadow: 5 }}

                >wide
        </StyledButton> */}
        <Button
            click={() => setnum(num+1)}
            
            freeze={isFreeze}
            c_w_h_r_d={{ base: 'h-32 w-32 rounded-2xl duration-300' }}
            c_out={{ base: 'm-20 group' }}
            c_mid={{ }}
            c_inn={{ base: 'bg-yellow-300 border-4 border-blue-800', isC:'bg-cyan-300', dis:'bg-black' }}
            var={{ shadow: { type: 2 }}}
                ><div className='w-full group-hover:bg-purple-400'>kids</div>
        </Button>
        <div>{num}</div>
        <div className={`${isFreeze ? 'bg-cyan-300' : 'bg-fuchsia-500'}`} onClick={() => setisFreeze(!isFreeze)}>toggleFreeze</div>
    </div>
})
