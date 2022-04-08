import React, { useState, useEffect } from "react";
import CoreButton from '../CoreButton/CoreButton'

export interface ButtonProps {
  theme: string[];      //[variant 0 - 5, ''] adds variants to all c_ props if none provided (except from tooltip)
//   type: string[];       //[bg, primary, secondary, accent, danger]
//   colors: object;       //{ primary: { bg: , text: , hover: , active: , clicked: }  }
  click?: () => void;    //onClick handler
  mouseIn?: () => void;  //onMouseEnter handler
  mouseOut?: () => void; //onMouseLeave handler
  isClicked?: any;       //bool || undefined button changes p_key2 if provided else button just calls click() and stays synchronized
  freeze?: any;          //bool || undefined button animation is toggle (on / off)
  disabled?: any;        //bool || undefined assigns c_disabled as class
  controls?: any;        //bool show liveEdit controls or not
  c_w_h_r_d?: { base?: string; noC?: string; isC?: string; dis?: string };  //[roundVar 0 - 5, basic, !isClicked, isClicked, isFrozen] disabled will be added, only here: width height rounded duration (set for inn, mid, out)
  c_out?: { base?: string; noC?: string; isC?: string; dis?: string };      //[variant 0 - 5, basic, !isClicked, isClicked, isFrozen] disabled will be added, only here: outter-ring (outter-shadow-2) margin padding
  c_mid?: { base?: string; noC?: string; isC?: string; dis?: string };      //[variant 0 - 5, basic, !isClicked, isClicked, isFrozen] disabled will be added, only here: inner-ring outter-shadow
  c_inn?: { base?: string; noC?: string; isC?: string; dis?: string };      //[variant 0 - 5, basic, !isClicked, isClicked, isFrozen] disabled will be added, only here: border inner-shadow scale, every class that isnt mentioned above
  var?: { shadow?: { type?: number }; scale?: { type?: number }, disabled?: { type?: number }} //variants
  tooltip?: string[];    //[variant 0 - 5, 'side: top / right / bottom / left', 'classNames']
  children?: React.ReactNode;
}

const Button = (p: ButtonProps) => {
    const variants = {
        shadow: {
            names: { 
                inner : {
                    0: 'shadow-inner-xl'
                }
            },
            0: '',
            1: {
                c_inn: { 
                    base: 'active:shadow-inner-xl' 
                },
                c_mid: { 
                    base: 'shadow-3xl hover:shadow-none',
                    isC: p.freeze ? 'shadow-none' : 'shadow-3xl'
                }
            },
            2: {
                c_inn: {
                    base: 'active:shadow-inner-xl',
                    isC: p.freeze && 'shadow-inner-xl'
                },
                c_mid: {
                    base: 'shadow-3xl hover:shadow-none',
                    isC: p.freeze ? 'shadow-none' : 'shadow-3xl'
                }
            },
            3: {
                c_inn: {
                    base: '',
                },
                c_mid: {
                    base: 'shadow-3xl hover:shadow-none',
                    isC: p.freeze ? 'shadow-none' : 'shadow-3xl'
                }
            },
            4: {
                c_inn: {
                    base: 'active:shadow-inner-xl',
                    isC: p.freeze && 'shadow-inner-xl'
                },
                c_mid: {
                    base: '',
                    
                }
            },
            5: {
                c_inn: {
                    base: '',
                },
                c_mid: {
                    base: 'active:shadow-none',
                    noC: 'hover:shadow-5xl',
                    isC: p.freeze ? 'shadow-none' : ' shadow-3xl'
                }
            },
            6: {
                c_inn: {
                    base: '',
                },
                c_mid: {
                    base: 'active:shadow-none',
                    noC: 'hover:shadow-3xl shadow-5xl',
                    isC: p.freeze && 'shadow-none'
                }
            },
            7: {
                c_inn: {
                    base: 'mt-1 hover:mt-0 active:mt-1',
                },
                c_mid: {
                    base: '-mt-1 hover:mb-1 active:mb-0',
                }
            },
        }
    }

    const [isClassN, setisClassN] = useState(false)
    const [classN, setclassN] = useState({})
    useEffect(() => { setisClassN(true) }, [])
    useEffect(() => getClassNames('set'), [p])
    useEffect(() => console.log(classN), [classN])

    const getClassNames = key => {
        let classNa = {
            c_w_h_r_d: { base: '', noC: '', isC: '', dis: ''},
            c_inn: { base: '', noC: '', isC: '', dis: ''},
            c_mid: { base: '', noC: '', isC: '', dis: ''},
            c_out: { base: '', noC: '', isC: '', dis: ''},
        }

        for (const p_key1 in p) {
            if(p_key1 == 'c_w_h_r_d' || p_key1 == 'c_inn' || p_key1 == 'c_mid' || p_key1 == 'c_out' || p_key1 == 'var'){
                if(Object.prototype.hasOwnProperty.call(p, p_key1)){
                    for (const p_key2 in p[p_key1]) {
                        if (Object.prototype.hasOwnProperty.call(p[p_key1], p_key2)) {
                            if(p_key1 != 'var') classNa[p_key1][p_key2] = `${classNa[p_key1][p_key2]} ${p[p_key1][p_key2]}` 
                            else {
                                if(p[p_key1][p_key2].type && variants[p_key2][p[p_key1][p_key2].type]){
                                    for (const key1 in variants[p_key2][p[p_key1][p_key2].type]) {
                                        if (Object.prototype.hasOwnProperty.call(variants[p_key2][p[p_key1][p_key2].type], key1)) {
                                            for (const v_key2 in variants[p_key2][p[p_key1][p_key2].type][key1]) {
                                                if (Object.prototype.hasOwnProperty.call(variants[p_key2][p[p_key1][p_key2].type][key1], v_key2)) {
                                                    classNa[key1][v_key2] = `${classNa[key1][v_key2]} ${variants[p_key2][p[p_key1][p_key2].type][key1][v_key2]}`
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if(key === 'set') setclassN(classNa)
        else return classNa[key]
    }

    return <>
        <CoreButton 
            click={p.click}
            mouseIn={p.mouseIn}
            mouseOut={p.mouseOut}
            isClicked={p.isClicked}
            disabled={p.disabled}
            freeze={p.freeze}
            c_w_h_r_d={isClassN ? classN['c_w_h_r_d'] : getClassNames('c_w_h_r_d')}
            c_out={isClassN ? classN['c_out'] : getClassNames('c_out')}
            c_mid={isClassN ? classN['c_mid'] : getClassNames('c_mid')}
            c_inn={isClassN ? classN['c_inn'] : getClassNames('c_inn')}
            >
            {p.children}
        </CoreButton>
    </>
}

export default Button;
