import React, { useState, useEffect } from "react";

export interface CoreButtonProps {
  click?: () => void;
  mouseIn?: () => void;
  mouseOut?: () => void;
  isClicked?: any;
  disabled?: any;
  freeze?: any;
  c_w_h_r_d?: { base?: string; noC?: string; isC?: string; dis?: string };
  c_out?: { base?: string; noC?: string; isC?: string; dis?: string };
  c_mid?: { base?: string; noC?: string; isC?: string; dis?: string };
  c_inn?: { base?: string; noC?: string; isC?: string; dis?: string };
  children?: React.ReactNode;
}

const CoreButton = (p: CoreButtonProps) => { console.log(p.c_inn)
  const [is_clicked, setis_clicked] = useState(false)
  useEffect(() => { if(p.isClicked != undefined) setis_clicked(p.isClicked) },[p.isClicked])
  useEffect(() => { if(p.isClicked != undefined) setis_clicked(p.isClicked) }, [is_clicked])

  const c_width_height_round_duration = p.c_w_h_r_d && `
    ${p.c_w_h_r_d.base}
    ${is_clicked ? p.c_w_h_r_d.isC
      : p.c_w_h_r_d.noC}
  `

  const classNames = {
    out:`
      ${p.disabled ? p.c_out.dis
        : `${p.c_out.base}
           ${is_clicked ? p.c_out.isC 
            : p.c_out.noC}`} 
      ${c_width_height_round_duration}
      max-w-fit
    `,
    mid: `
      ${p.disabled ? p.c_mid.dis
        : `${p.c_mid.base}
          ${is_clicked ? p.c_mid.isC 
            : p.c_mid.noC}`} 
      ${c_width_height_round_duration}
      max-w-fit
    `,
    inn: `
      ${p.disabled ? p.c_inn.dis
        : `${p.c_inn.base}
          ${is_clicked ? p.c_inn.isC 
            : p.c_inn.noC}`} 
      ${c_width_height_round_duration}
      center
    `
  }

  return <>
    <div className={classNames.out}
      onClick={() => { if(!p.disabled){ setis_clicked(!is_clicked); if(p.click) p.click() }}}
      onMouseEnter={() => { if(!p.disabled && p.mouseIn) p.mouseIn() }}
      onMouseLeave={() => { if(!p.disabled && p.mouseOut) p.mouseOut() }}
        >
        <div className={classNames.mid}>
            <div className={classNames.inn}>
                  {p.children}
            </div>
        </div>
    </div>
  </>
}

export default CoreButton;
