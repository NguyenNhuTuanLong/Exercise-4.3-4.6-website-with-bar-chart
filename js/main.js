// Step 2: Tạo khung SVG responsive và có viền đen
const svg = d3.select(".responsive-svg-container")
              .append("svg")
              .attr("viewBox", "0 0 1200 1600")
              .style("border", "1px solid black");

// Step 3: Vẽ một hình chữ nhật dài, mỏng màu xanh dương để test
svg.append("rect")
   .attr("x", 10)
   .attr("y", 10)
   .attr("width", 414)
   .attr("height", 16)
   .attr("fill", "blue");