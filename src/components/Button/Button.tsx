import React, { useState, useEffect } from "react";
import CoreButton from '../CoreButton/CoreButton'
import Tooltip from "../Tooltip";

export interface ButtonProps {
  click?: () => void;    //onClick handler
  mouseIn?: () => void;  //onMouseEnter handler
  mouseOut?: () => void; //onMouseLeave handler
  isClicked?: any;       //bool || undefined button changes p_key2 if provided else button just calls click() and stays synchronized
  freeze?: any;          //bool || undefined button animation is toggle (on / off)
  disabled?: any;        //bool || undefined assigns c_disabled as class
  controls?: any;        //bool show liveEdit controls or not
  c_w_h_r_d?: { def?: string; noC?: string; isC?: string; dis?: string };  //[roundVar 0 - 5, default, !isClicked, isClicked, disabled] only here: width height rounded duration (set for inn, mid, out)
  c_out?: { def?: string; noC?: string; isC?: string; dis?: string };      //[variant 0 - 5, default, !isClicked, isClicked, disabled] only here: outter-ring (outter-shadow-2) margin padding
  c_mid?: { def?: string; noC?: string; isC?: string; dis?: string };      //[variant 0 - 5, default, !isClicked, isClicked, disabled] only here: inner-ring outter-shadow
  c_inn?: { def?: string; noC?: string; isC?: string; dis?: string };      //[variant 0 - 5, default, !isClicked, isClicked, disabled] only here: border inner-shadow scale, every class that isnt mentioned above
  var?: { shadow?: { type?: number; inner?: any; outter?: any }; scale?: { type?: number }, disabled?: { type?: number }} //variants
  tooltip?: { side?: string; disabled?: any; shadow?: any; c_def?: string; children?: React.ReactNode }; //'absolute' will be added to c_mid, 'group' to c_out
  children?: React.ReactNode;
}

const Button = (p: ButtonProps) => {

    const check3 = (obj, key1, key2, key3) => obj[key1] && obj[key1][key2] && obj[key1][key2][key3]

    const override = (obj, key1, key2, key3, norm) => (
        check3(obj, key1, key2, key3) 
        && overrides.check(key2, key3, obj[key1][key2][key3]) 
        ? obj[key1][key2][key3] 
        : norm
    )

    const getOv = (key1, key2, state, norm) => (
        check3(p, 'var', key1, key2) 
        && typeof p.var[key1][key2] == 'string' 
        ? p.var[key1][key2] //set provided value if e.g. outter shadow is string
        : overrides.shadow[key2][override(p, 'var', key1, key2, norm)][state]
    )

    const getDefaultOv = (key1, key2) => overrides[key1][key2].default

    const variants = {
        shadow: {
            1: { //inner outter
                c_inn: { 
                    def: getOv('shadow', 'inner', 'active', 1)
                },
                c_mid: { 
                    def: `hover:shadow-none ${!p.freeze && getOv('shadow', 'outter', 'norm', 1)}`,
                    noC: `${getOv('shadow', 'outter', 'norm', 1)}`
                }
            },
            2: { //inner outter
                c_inn: {
                    def: getOv('shadow', 'inner', 'active', 1),
                    isC: p.freeze && getOv('shadow', 'inner', 'norm', 1)
                },
                c_mid: { 
                    def: `hover:shadow-none ${!p.freeze && getOv('shadow', 'outter', 'norm', 1)}`,
                    noC: `${getOv('shadow', 'outter', 'norm', 1)}`
                }
            },
            3: { //inner
                c_inn: {
                    def: getOv('shadow', 'inner', 'active', 1),
                    isC: p.freeze && getOv('shadow', 'inner', 'norm', 1)
                },
            },
            4: { //outter
                c_mid: { 
                    def: `hover:shadow-none ${!p.freeze && getOv('shadow', 'outter', 'norm', 1)}`,
                    noC: `${getOv('shadow', 'outter', 'norm', 1)}`,
                }
            },
            5: { //outter
                c_mid: { 
                    def: `active:shadow-none ${!p.freeze && getOv('shadow', 'outter', 'norm', 1)}`,
                    noC: `${getOv('shadow', 'outter', 'norm', 1)}`,
                }
            },
            6: { //outter
                c_mid: {
                    def: `active:shadow-none ${!p.freeze && getOv('shadow', 'outter', 'hover', 1)}`,
                    noC: getOv('shadow', 'outter', 'hover', 1),
                }
            },
            7: {
                // c_mid: {  //double outter not based on props bc props only let user define 1 shadow 
                //     def: `active:shadow-none ${!p.freeze && `${overrides.shadow.outter[1].hover} ${overrides.shadow.outter[2].norm}`}`,
                //     noC: `${overrides.shadow.outter[1].hover} ${overrides.shadow.outter[2].norm}`,
                // },
                c_mid: {  //double outter
                    def: `active:shadow-none ${!p.freeze && `${overrides.shadow.outter[3].hover} ${getOv('shadow', 'outter', 'norm', 6)}`}`,
                    noC: `${overrides.shadow.outter[3].hover} ${getOv('shadow', 'outter', 'norm', 6)}`,
                }
            },
            8: {
                c_inn: {
                    def: 'mt-1 hover:mt-0 active:mt-1',
                },
                c_mid: {
                    def: '-mt-1 hover:mb-1 active:mb-0',
                }
            },
        },
        scale: {
            1: {}
        }
    }

    const [isClassN, setisClassN] = useState(false)
    const [classN, setclassN] = useState({})
    useEffect(() => { setisClassN(true) }, [])
    useEffect(() => getClassNames('set'), [p])
    // useEffect(() => console.log(classN), [classN])

    const getClassNames = key => {
        let classNa = {
            c_w_h_r_d: { def: '', noC: '', isC: '', dis: ''},
            c_inn: { def: '', noC: '', isC: '', dis: ''},
            c_mid: { def: `${p.tooltip && 'absolute '}`, noC: '', isC: '', dis: ''},
            c_out: { def: `${p.tooltip && 'group '}`, noC: '', isC: '', dis: ''},
        }

        for (const p_key1 in p) {
            if(p_key1 == 'c_w_h_r_d' || p_key1 == 'c_inn' || p_key1 == 'c_mid' || p_key1 == 'c_out' || p_key1 == 'var'){
                if(p[p_key1]){
                    for (const p_key2 in p[p_key1]) {
                        if (p[p_key1][p_key2]) { //assign prop classes to new className obj
                            if(p_key1 != 'var') classNa[p_key1][p_key2] = `${classNa[p_key1][p_key2]} ${p[p_key1][p_key2]}` 
                            else { //add all variants to new className obj
                                if(p[p_key1][p_key2].type && variants[p_key2][p[p_key1][p_key2].type]){
                                    for (const key1 in variants[p_key2][p[p_key1][p_key2].type]) {
                                        if (variants[p_key2][p[p_key1][p_key2].type][key1]) {
                                            for (const v_key2 in variants[p_key2][p[p_key1][p_key2].type][key1]) {
                                                if(variants[p_key2][p[p_key1][p_key2].type][key1][v_key2]){
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

    const addTooltipShadow = () => (
        p.tooltip.shadow 
        && overrides.shadow.outter[p.tooltip.shadow] 
        && overrides.shadow.outter[p.tooltip.shadow].norm
        ? overrides.shadow.outter[p.tooltip.shadow].norm
        : p.tooltip.shadow
    )

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
            {p.tooltip && 
                <Tooltip 
                    side={p.tooltip.side}
                    disabled={p.tooltip.disabled || p.disabled}
                    c_def={`${addTooltipShadow()} ${p.tooltip.c_def}`}
                >{p.tooltip.children}
                </Tooltip>}
            {p.children}
        </CoreButton>
    </>
}

    const overrides = {
        shadow: {
            inner: {
                default: 2,
                1: {
                    norm: 'shadow-inner-xl',
                    hover: 'hover:shadow-inner-xl',
                    active: 'active:shadow-inner-xl'
                },
                2: {
                    norm: 'shadow-inner-2xl',
                    hover: 'hover:shadow-inner-2xl',
                    active: 'active:shadow-inner-2xl'
                }
            },
            outter: {
                default: 3,
                1: {
                    norm: 'shadow-xl',
                    hover: 'hover:shadow-xl',
                    active: 'active:shadow-xl'
                },
                2: {
                    norm: 'shadow-2xl',
                    hover: 'hover:shadow-2xl',
                    active: 'active:shadow-2xl'
                },
                3: {
                    norm: 'shadow-3xl',
                    hover: 'hover:shadow-3xl',
                    active: 'active:shadow-3xl'
                },
                4: {
                    norm: 'shadow-4xl',
                    hover: 'hover:shadow-4xl',
                    active: 'active:shadow-4xl'
                },
                5: {
                    norm: 'shadow-5xl',
                    hover: 'hover:shadow-5xl',
                    active: 'active:shadow-5xl'
                },
                6: {
                    norm: 'shadow-6xl',
                    hover: 'hover:shadow-6xl',
                    active: 'active:shadow-6xl'
                },
                7: {
                    norm: 'shadow-7xl',
                    hover: 'hover:shadow-7xl',
                    active: 'active:shadow-7xl'
                },
            },
        },
        check(key1, key2, key3){
            return this[key1][key2][key3]
        },
    }

export default Button;
