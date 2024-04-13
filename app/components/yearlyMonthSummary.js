import { Text, View, StyleSheet } from "react-native";

const MonthSummary = ({ month, totalIncome, totalExpenditure, savings }) => {
  return (
    <View style={styles.summary}>
      <View>
        <Text style={styles.monthName}>{month}</Text>
      </View>
      <View style={styles.summaryText}>
        <Text style={styles.summaryTextDescription}>Income: </Text>
        <Text style={styles.summaryAmount}>₹{totalIncome}</Text>
      </View>
      <View style={styles.summaryText}>
        <Text style={styles.summaryTextDescription}>Expenditure: </Text>
        <Text style={styles.summaryAmount}>₹{totalExpenditure}</Text>
      </View>
      <View style={styles.summaryText}>
        <Text style={styles.summaryTextDescription}>Savings: </Text>
        <Text
          style={[
            styles.summaryAmount,
            {
              color:
                savings < 0 ? "#E10000" : savings > 0 ? "#00B900" : "#8953b1",
            },
          ]}
        >
          {savings < 0 ? "- " : ""}₹{Math.abs(savings)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summary: {
    backgroundColor: "rgba(255, 230, 230, 0.8)",
    marginVertical: "3%",
    padding: "5%",
    borderRadius: 7,
  },
  monthName: {
    fontSize: 18,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#8953b1",
  },
  summaryText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryTextDescription: {
    fontSize: 16,
    color: "#7469B6",
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "italic",
    color: "#8953b1",
  },
});

export default MonthSummary;
