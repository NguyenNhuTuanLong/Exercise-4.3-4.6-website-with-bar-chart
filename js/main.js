// Step 2: Tạo khung SVG responsive và có viền đen
const svg = d3.select(".responsive-svg-container")
              .append("svg")
              .attr("viewBox", "0 0 1200 1600")
              .style("border", "1px solid black");

// Step 3: Vẽ một hình chữ nhật dài, mỏng màu xanh dương để test


// Đọc dữ liệu từ file CSV trong thư mục data
d3.csv("data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count // Dấu + giúp chuyển chuỗi thành số
    };
}).then(data => {
    // In dữ liệu ra Console để kiểm tra
    console.log("Dữ liệu thô:", data);
    
    // Kiểm tra thông tin tập dữ liệu
    console.log("Số lượng dòng:", data.length);
    console.log("Giá trị max:", d3.max(data, d => d.count));
    console.log("Giá trị min:", d3.min(data, d => d.count));
    console.log("Mảng Min & Max:", d3.extent(data, d => d.count));

    // Sắp xếp dữ liệu từ cao xuống thấp
    data.sort((a, b) => b.count - a.count);
    
    // In dữ liệu đã sắp xếp ra để kiểm tra
    console.log("Dữ liệu sau khi sắp xếp:", data);

    // Gọi hàm chuẩn bị vẽ biểu đồ
    drawBarChart(data);
});

// Hàm rỗng để chuẩn bị cho Exercise 4.5
function drawBarChart(data) {
    console.log("Dữ liệu đã sẵn sàng để vẽ Bar Chart!");
}