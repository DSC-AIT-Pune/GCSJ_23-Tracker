function compare(a, b) {
  if ((a["# of Courses Completed"] + a["# of Skill Badges Completed"] + a["# of GenAI Game Completed"]) > (b["# of Courses Completed"] + b["# of Skill Badges Completed"] + b["# of GenAI Game Completed"])) {
    return -1;
  }
  if ((a["# of Courses Completed"] + a["# of Skill Badges Completed"] + a["# of GenAI Game Completed"]) < (b["# of Courses Completed"] + b["# of Skill Badges Completed"] + b["# of GenAI Game Completed"])) {
    return 1;
  }
  if (a["Redemption Status"] === "Yes" && b["Redemption Status"] === "No") {
    return -1;
  }
  if (a["Redemption Status"] === "No" && b["Redemption Status"] === "Yes") {
    return 1;
  }
  return 0;
}

const updateData = async (filter) => {
  let url = "./data/data.json"
  let data = await (await fetch(url)).json();
  let total_started = 0;
  if (filter !== "") {
    data = data.filter((el) => {
      return el["Student Name"].toLowerCase().includes(filter.toLowerCase());
    });
  }
  data.sort(compare);
  let total_reg = data.length;
  let html = "";
  data.forEach((d, i) => {
    total_started += d["Redemption Status"] === "Yes" ? 1 : 0;
    html += `<tr>
                <th>${i + 1}</th>
                <td><a style="text-decoration: none;" href="${
                  d["Google Cloud Skills Boost Profile URL"]
                }" target="_blank" style="color:black;">${
      d["Student Name"]
    }</a></td>
                        <td>${
                          d["Redemption Status"] === "Yes" ? "✅" : "⚠️"
                        }</td>
                        <td>${d["# of Courses Completed"]}</td>
                        <td>${d["# of Skill Badges Completed"]}</td>
                        <td>${d["# of GenAI Game Completed"]}</td>
                        <td>${d["Total Completions of both Pathways"]}</td>
                   </tr>
                      `;
  });
  document.getElementById("gccp_body").innerHTML = html;
};

updateData("");
const input = document.getElementById("input");
input.addEventListener("input", () => {
  console.log(input.value);
  updateData(input.value);
});