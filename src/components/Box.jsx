function Box({ coordinate, color }) {
   const defaultColor = "transparent";
   if(!color){
      color = defaultColor;
   }
   const style={
      backgroundColor: color,
   }
   return (
      < div
         data-coordinate={ coordinate }
         style={style}
      />
   )
}

export default Box;