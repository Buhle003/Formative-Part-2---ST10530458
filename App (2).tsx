import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  Alert,
  SafeAreaView,
} from 'react-native';


type Screen =
| "splash"
| "login"
| "home"
| "category"
| "foodDetails"
| "foodList"
| "cart"
| "checkout"
| "payment"
| "confirmation"
| "tracking"
| "reservation"
| "reservationConfirmation"
| "chefMenu"
| "profile";

type MenuItems = 
{
  id: number;
  dishName: string;
  description: string;
  emoji: string;
  course: string;
  price: string;
};

type FoodItem = {
  id: number;
  name: string;
  price: number;
  emoji: string;
  description: string;
  ingredients: string;
  course: string;
  category: string;
};


export default function App() {

  const [menuItems, setMenuItems] = useState<FoodItem[]>([
    {
      id: 1,
      name: "Classic Burger",
      course: "main",
      price: 60,
      emoji: "🍔",
      description: "A delicious burger made with a juicy beef patty, fresh lettuce, tomato and cheese.",
      ingredients: "Beef Patty, Cheese, Lettuce, Tomato, Onion, Burger Sauce, Bun",
      category: "Burgers",
    },
    {
      id: 2,
      name: "Pizza",
      course: "main",
      price: 45,
      emoji: "🍕",
      description: "A delicious burger made with a juuicy beef patty, fresh lettuce, tomato and cheese.",
      ingredients: "Pizza dough, Marina Sauce, Mozzarella Cheese with Toppings",
      category: "Pizzas",
    },
    {
      id: 3,
      name: "Salad",
      course: "starter",
      price: 30,
      emoji: "🥗",
      description: "An incredible salad made with the freshest vegetables with cheese and dressing.",
      ingredients: "Lettuce, Cucumber, Avocado, Tomato, Fetta cheese, Salad dressing",
      category: "Salads",
    },
    {
      id: 4,
      name: "Vanilla Cake",
      course: "dessert",
      price: 30,
      emoji: "🍰",
      description: "A delectable vanilla cake with strawberry.",
      ingredients: "Vanilla, Flour, Eggs, Sugar, Vanilla cream with a Strawberry topping",
      category: "Desserts",
    },
    {
      id: 5,
      name: "Spaghetti bolognese",
      course: "main",
      price: 35,
      emoji: "🍝",
      description: "A flavourful bowl of pasta with fresh herbs, locally sourced beef mince and the finest wine.",
      ingredients: "Spaghetti pasta,Beef mince, Onion,Tomato, Sugar, Red wine, Meat Sauce, Parmesan Cheese",
      category: "Pastas"
    },
  ]);

  //-- Menu stats --//
  const totalMenuItems = menuItems.length;


  //--Calculate average price--//

  const totalMenuPrice = menuItems.reduce(
    (total, item) => total + item.price,
    0
  );
  const averagePrice = totalMenuItems > 0 ? totalMenuPrice / totalMenuItems : 0;

  //--Count items in each course--//

  const starterCount = menuItems.filter((item: FoodItem) => item.course.toLowerCase() === "starter").length;
  const mainCount = menuItems.filter((item: FoodItem) => item.course.toLowerCase() === "main").length;
  const dessertCount = menuItems.filter((item: FoodItem) => item.course.toLowerCase() === "dessert").length;

  //--Navigation state--//

  const [screen, setScreen] = useState<Screen>("splash");


  //--Login state--//

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");


  //--Profile state--//
  
const [isEditingProfile, setIsEditingProfile] = useState(false);
const [editName, setEditName] = useState(userName);
const [editEmail, setEditEmail] = useState(userEmail);
const [profileLocation, setProfileLocation] = useState("");
const [editLocation, setEditLocation] = useState("");
const [notificationsEnabled, setNotificationsEnabled] = useState(true); 
const [showEditProfile, setShowEditProfile] = useState(false);
const [showLocation, setShowLocation] = useState(false);
const [showPayment, setShowPayment] = useState(false);


  //--Menu state--//

  const [menuOpen,setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState("");


  //--Search state--//

  const [searchText, setSearchText] = useState("");


  //--Categoreis state--//

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dishCategory, setDishCategory] = useState("");
  const filteredCategoryItems = menuItems.filter((item) => item.category?.trim().toLowerCase() === selectedCategory.trim().toLowerCase);


  //--Filter state--//

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const filteredItems = selectedCategory
    ? menuItems.filter((item) => item.course === selectedCategory)
    : menuItems;


  //--Cart state--//

  const [cart, setCart] = useState<Array<{id: number, name: string, price: number, quantity: number}>>([]);


  //--Selected Food state--//

  const [selectedFood, setSelectedFood] = useState<FoodItem>(menuItems[0]);
  const [selectedFoodIndex, setSelectedFoodIndex] = useState<number>(0);

  const openFoodDetails = (item: FoodItem) => {
    const itemIndex = menuItems.findIndex((foodItem) => foodItem.id === item.id);
    setSelectedFoodIndex(itemIndex >= 0 ? itemIndex : 0);
    setSelectedFood(item);
    setScreen("foodDetails");
  };


  //--Previous,Next buttons state--//

  const showPreviousFood = () => {
    const prevIndex = (selectedFoodIndex - 1 + menuItems.length) % menuItems.length;
    setSelectedFoodIndex(prevIndex);
    setSelectedFood(menuItems[prevIndex]);
  };

  const showNextFood = () => {
    const nextIndex = (selectedFoodIndex + 1) % menuItems.length;
    setSelectedFoodIndex(nextIndex);
    setSelectedFood(menuItems[nextIndex]);
  };


  //--Profile state--//

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");


  //--Reservation state--//

  const [guests, setGuests] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [reservationEmail, setReservationEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");


//--Payment state--//
  
const [paymentMethod, setPaymentMethod] = useState("Card");
const [cardType, setCardType] = useState("Visa");

const [cardName, setCardName] = useState("");
const [cardNumber, setCardNumber] = useState("");
const [expiryDate, setExpiryDate] = useState("");
const [cvv, setCvv] = useState("");


  //--Chef menu state--//

  const [dishName, setDishName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [chefMenuItems, setChefMenuItems] = useState<MenuItems[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [editingItemId, setEditingItemId] = useState<number | null>(null);


//--Edit menu item--//

   const editMenuItem = (item: FoodItem) => {
  setDishName(item.name);
  setDescription(item.description);
  setCourse(item.course);
  setDishCategory(item.category);
  setPrice(item.price.toString());
  setEditingItemId(item.id);
  setErrorMessage("");
};


//--Add menu item--//
    
const addMenuItem = () => {
  setErrorMessage("");

  if (
    dishName.trim() === "" ||
    description.trim() === "" ||
    course.trim() === "" ||
    price.trim() === ""
  ) {
    setErrorMessage("Please complete all required fields.");
    return;
  }

  const numericPrice = Number(price);

  if (isNaN(numericPrice) || numericPrice <= 0) {
    setErrorMessage("Please enter a valid price.");
    return;
  }

  const updatedItem: FoodItem = {
    id: editingItemId !== null ? editingItemId : Date.now(),
    name: dishName.trim(),
    description: description.trim(),
    course: course.toLowerCase(),
    category: dishCategory.trim(),
    price: numericPrice,
    emoji: "🍽️",
    ingredients: "",
  };


//--Update existing dish--//

  if (editingItemId !== null) {
    setMenuItems(previousItems =>
      previousItems.map(item =>
        item.id === editingItemId ? updatedItem : item
      )
    );

    setSelectedFood(previousFood =>
      previousFood?.id === editingItemId
        ? updatedItem
        : previousFood
    );

    Alert.alert("Success", "Dish updated successfully!");
  } else {

    //--Add a new dish--//

    setMenuItems(previousItems => [
      ...previousItems,
      updatedItem,
    ]);

    Alert.alert("Success", "New dish added successfully!");
  }

  // Clear the form--//

  setDishName("");
  setDescription("");
  setCourse("");
  setDishCategory("");
  setPrice("");
  setEditingItemId(null);
};


const deleteMenuItem = (itemId: number) => {
  console.log("Delete button pressed. Item ID:", itemId);

  setMenuItems(previousItems =>
    previousItems.filter(item => item.id !== itemId)
  );

  Alert.alert("Deleted", "The dish has been removed.");
};



  //--Splash screen

  if (screen === "splash") {

    return (

      <SafeAreaView style={styles.container}>

        <View style={styles.splashContainer}>

          <Text style={styles.logoText}>
            🍽️
            </Text>

            <Text style={styles.appName}>
            The Restaurant
            </Text>

        <Text style={styles.splashDescription}>
          Welcome to the Food Delivery App
          </Text>

        <TouchableOpacity style={styles.startButton} onPress={() => setScreen("login")}>

          <Text style={styles.buttonText}>
            Get Started
            </Text>

        </TouchableOpacity>

        </View>
        
      </SafeAreaView>
    );
  }


//--Login screen--//

   if (screen === "login") {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>

        <Text style={styles.logo}>
          🍽️
        </Text>

        <Text style={styles.title}>
          Welcome Back!
        </Text>

        <Text style={styles.subtitle}>
          Login to continue
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setLoginError("");
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setLoginError("");
          }}
        />

        {/* Login error message */}
        {loginError !== "" && (
          <Text style={styles.errorText}>
            {loginError}
          </Text>
        )}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {

            if (email.trim() === "" || password === "") {
              setLoginError("Please enter your email and password.");
              return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
              setLoginError("Please enter a valid email address.");
              return;
            }

            setLoginError("");
            setScreen("home");

          }}
        >
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );

}


  //--Home screen--//

  if (screen === "home") {

    return (

      <SafeAreaView style={styles.container}>
        
        <ScrollView>

          {/* Header */}

          <View style={styles.header}>

          <TouchableOpacity onPress={() => 
          setMenuOpen(!menuOpen)}
            style={styles.menuButton}>

            <Text style={styles.menuIcon}>
              ☰
              </Text>

          </TouchableOpacity>

          {/* Heading */}

          <Text style={styles.headerTitle}>
            Home
          </Text>

          {menuOpen && (
            <View style={styles.toggleMenu}>

            {/* HOME */}

              <TouchableOpacity
             style={styles.menuItem}
      onPress={() => {
        setScreen("home");
        setMenuOpen(false);
      }}
    >
      <Text style={styles.menuText}>🏠 Home</Text>
    </TouchableOpacity>

     {/* FOOD MENU */}

    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        setScreen("foodList");
        setMenuOpen(false);
      }}
    >
      <Text style={styles.menuText}>🍽️ Browse Food Menu</Text>
    </TouchableOpacity>


    {/* CART */}

    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        setScreen("cart");
        setMenuOpen(false);
      }}
    >
      <Text style={styles.menuText}>🛒 My Cart</Text>
    </TouchableOpacity>

    {/* TRACK ORDER */}

    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        setScreen("tracking");
        setMenuOpen(false);
      }}
    >
      <Text style={styles.menuText}>📍 Track My Order</Text>
    </TouchableOpacity>


              {/* CHEF MENU */}

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setScreen("chefMenu");
                  setMenuOpen(false);
                }}
              >

                <Text style={styles.menuText}>
                  👨‍🍳 Chef Menu Management
                  </Text>

              </TouchableOpacity>

              {/* RESERVATION */}

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setScreen("reservation");
                  setMenuOpen(false);
                }}
              >
                <Text style={styles.menuText}>
                  📅 Make a Reservation
                  </Text>

              </TouchableOpacity>

               {/* PROFILE */}

    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        setScreen("profile");
        setMenuOpen(false);
      }}
    >
      <Text style={styles.menuText}>👤 My Profile</Text>
    </TouchableOpacity>

              {/* LOG OUT */}

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setScreen("login");
                  setMenuOpen(false);
                }}
              >
                <Text style={styles.menuText}>
                  🚪 Log Out
                  </Text>

              </TouchableOpacity>

            </View>
          )}


            {/* Profile button */}

            <TouchableOpacity
              style={styles.topProfileButton}
              onPress={() => setScreen("profile")}
            >

              <Text style={styles.profile}>
                Profile
                </Text>

            </TouchableOpacity>

        </View>


        {/* Seacrh */}

      <View style={styles.searchResultsContainer}>

        <Text style={styles.searchEmoji}>
            🔍
          </Text>

           <TextInput
        style={styles.searchBar}
        placeholder="Search for item..."
        value={searchText}
        onChangeText={setSearchText}
        />

        </View>
      
      {/* SEARCH RESULTS - Only visible when searching */}

       {searchText.length > 0 && (

         <View>
          {filteredMenuItems.length > 0 ? (
           filteredMenuItems.map((item) => (
        <TouchableOpacity
            key={item.id}
            onPress={() => {
            setSelectedFood(item);
            setScreen("foodDetails");
            }}
              >
          <Text>{item.emoji} {item.name}</Text>
          <Text>R{item.price.toFixed(2)}</Text>
        </TouchableOpacity>
      ))
    ) : (
      <Text>No matching food items found.</Text>
    )}
  </View>
)}

      {/* Promotion */}

      <View style={styles.promotion}>

        <Text style={styles.promotionTitle}>
          Today's Special
        </Text>

        <Text>
          Get our finest meals delivered straight to your door at a better price.
          </Text>

      </View>


      {/* Chef button */}

      <TouchableOpacity
      style={styles.chefButton}
      onPress={() =>
        setScreen("chefMenu")
      }>

        <Text style={styles.buttonText}>
          Chef menu management
        </Text>

      </TouchableOpacity>


      {/* Categories Button */}

      <Text style={styles.sectionTitle}>
        Categories
      </Text>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}>

          <View style={styles.row}>

          <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => {
            setSelectedCategory("Burgers");
            setScreen("category");
          }}>

            <Text>
              🍔
              </Text>

            <Text>
              Burgers
              </Text>

          </TouchableOpacity>

          <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => {
            setSelectedCategory("Pizzas");
            setScreen("category");
          }}>

            <Text>
              🍕
              </Text>

            <Text>
              Pizzas
              </Text>

          </TouchableOpacity>

          <TouchableOpacity 
          style={styles.categoryButton}
          onPress={() => {
            setSelectedCategory("Salads");
            setScreen("category");
          }}>

            <Text>
              🥗
              </Text>

            <Text>
              Salads
              </Text>

          </TouchableOpacity>

          <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => {
            setSelectedCategory("Desserts");
            setScreen("category");
          }}>

            <Text>
              🍰
            </Text>

            <Text>
              Desserts
              </Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryButton}
          onPress={() => {
            setSelectedCategory("Pastas");
            setScreen("category");
          }}>

            <Text>
              🍝
            </Text>

            <Text>
              Pasta
              </Text>

          </TouchableOpacity>

          </View>

        </ScrollView>


        {/* Popular Foods */}

        <View style={styles.popularHeader}>

          <Text style={styles.sectionTitle}>
            Most Popular Items
          </Text>

          <TouchableOpacity
          onPress={() => 
          setScreen("foodList")}>

            <Text style={styles.seeAll}>
              See All ›
            </Text>

          </TouchableOpacity>

        </View>

        {/* Food Items */}

        <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        directionalLockEnabled={true}
        contentContainerStyle={styles.foodScrollContainer}>

          {menuItems.map((item) => (

            <TouchableOpacity
            key={item.id}
            style={styles.foodListCard}
            onPress={() => { 
              setSelectedFood(item);
              setScreen("foodDetails");
            }}>
             
              <Text style={styles.foodImage}>
                {item.emoji}
              </Text>

            <View style={styles.foodListInfo}>

               <Text style={styles.foodName}>
                {item.name}
              </Text>

               <Text style={styles.foodPrice}>
                R{item.price}
              </Text>

              </View>

              </TouchableOpacity>

          ))}

                  
        </ScrollView>
      
  </ScrollView>

</SafeAreaView>

 );

  }


//--Food list screen --//

if (screen === "foodList") {

  return (

    <SafeAreaView style={styles.container}>


      {/* Header */}

      <View style={styles.header}>

        <TouchableOpacity
        onPress={() => setScreen("home")}>

          <Text style={styles.backButton}>
            ←
          </Text>

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          All Food Items
        </Text>

        <View />

      </View>

      {/* Food List */}

      <ScrollView>

        <View style={styles.foodListContainer}>

          {menuItems.map((item) => (

            <TouchableOpacity
            key={item.id}
            style={styles.foodListCard}
            onPress={() => openFoodDetails(item)}>

              <Text style={styles.foodListEmoji}>
                {item.emoji}
              </Text>

              <View style={styles.foodListInfo}>

                <Text style={styles.foodListName}>
                  {item.name}
                </Text>

                <Text style={styles.foodListDescription}>
                  {item.description}
                </Text>

                <Text style={styles.foodListPrice}>
                  {item.price}
                </Text>

                </View>

                </TouchableOpacity>

          ))}


        </View>

      </ScrollView>

    </SafeAreaView>
  )
}


//--Category screen --//

if (screen === "category") {

  const categoryItems = menuItems.filter(
    (item) =>
      item.category?.trim().toLowerCase() ===
      selectedCategory.trim().toLowerCase()
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => setScreen("home")}
        >
          <Text style={styles.backButton}>
            ←
          </Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {selectedCategory}
        </Text>

        <View />

      </View>

      {/* Category title */}
      <Text style={styles.categoryScreenTitle}>
        {selectedCategory} Menu
      </Text>

      {/* Food items */}
      <ScrollView
        contentContainerStyle={styles.categoryFoodContainer}
      >

        {categoryItems.length > 0 ? (

          categoryItems.map((item) => (

            <TouchableOpacity
              key={item.id}
              style={styles.categoryFoodCard}
              onPress={() => {
                setSelectedFood(item);
                setScreen("foodDetails");
              }}
            >

              {/* Food image */}
              <Text style={styles.categoryFoodEmoji}>
                {item.emoji}
              </Text>

              <View style={styles.categoryFoodInfo}>

                {/* Name */}
                <Text style={styles.categoryFoodName}>
                  {item.name}
                </Text>

                {/* Description */}
                <Text style={styles.categoryFoodDescription}>
                  {item.description}
                </Text>

                {/* Price */}
                <Text style={styles.categoryFoodPrice}>
                  R{item.price}
                </Text>

              </View>

            </TouchableOpacity>

          ))

        ) : (

          <Text>
            No food items available in this category.
          </Text>

        )}

      </ScrollView>

      
        {/* Bottom Navigation */}

      <View style={styles.bottomNavigation}>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("home")}
        >

          <Text style={styles.navText}>
            🏠
          </Text>

          <Text style={styles.navText}>
            Home
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("tracking")}
        >

          <Text style={styles.navText}>
            📍
          </Text>

          <Text style={styles.navText}>
            Track
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("cart")}
        >

          <Text style={styles.navText}>
            🛒
          </Text>

          <Text style={styles.navText}>
            Cart
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("profile")}
        >

          <Text style={styles.navText}>
            👤
          </Text>

          <Text style={styles.navText}>
            Profile
          </Text>

        </TouchableOpacity>

      </View>

    </SafeAreaView>

  );

}


//--Food Details Screen--//

if (screen === "foodDetails") {

  return (
     
    <SafeAreaView style={styles.container}>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.header}>
  
          <Text style={styles.headerTitle}>
            Food Details
          </Text>

          <TouchableOpacity
          onPress={() =>
            setScreen("home")
          }>

            <Text style={styles.backButton}>
              ←
            </Text>

          </TouchableOpacity>

        <View style={styles.foodNavigation}>

          <TouchableOpacity
          style={styles.previousButton}
          onPress={showPreviousFood}>

            <Text style={styles.navigationText}>
               ← Previous
            </Text>

            </TouchableOpacity>

            <TouchableOpacity
          style={styles.nextButton}
          onPress={showNextFood}>

            <Text style={styles.navigationText}>
               Next →
            </Text>

            </TouchableOpacity>

          <View />

        </View>

      </View>

      <ScrollView
        contentContainerStyle={styles.foodDetailsContainer}>


          {/*Food Image */}

          <Text style={styles.detailsEmoji}>
            {selectedFood.emoji}
          </Text>

          {/* Food Name */}

          <Text style={styles.foodDetailsContainer}>
            {selectedFood.name}
          </Text>

          {/* Price */}

          <Text style={styles.detailsPrice}>
            R{selectedFood.price}
          </Text>

          {/* Description */}

          <Text style={styles.detailsSectionTitle}>
            Food Description
          </Text>

          <View style={styles.detailsBox}>

            <Text style={styles.detailsText}>
              {selectedFood.description}
            </Text>

          </View>

          {/* Ingredients */}

          <View style={styles.detailsSectionTitle}>
            Ingredients
          </View>

          <View style={styles.detailsBox}>

            <Text style={styles.detailsBox}>
            {selectedFood.ingredients}
            </Text>

          </View>

        </ScrollView>

        {/* Add to Cart */}

        <TouchableOpacity
        style={styles.addButton}
        onPress={() => {

          const cartItem = {
            id: selectedFood.id,
            name: selectedFood.name,
            price: selectedFood.price,
            quantity: 1,
          };

          setCart([
            ...cart,
            cartItem
          ]);

          Alert.alert(
            "Added",
            "Item added to your cart"
          );

        }}>

          <Text style={styles.buttonText}>
            Add to cart
          </Text>

          </TouchableOpacity>

          {/* Bottom Navigation */}

      <View style={styles.bottomNavigation}>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("home")}
        >

          <Text style={styles.navText}>
            🏠
          </Text>

          <Text style={styles.navText}>
            Home
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("tracking")}
        >

          <Text style={styles.navText}>
            📍
          </Text>

          <Text style={styles.navText}>
            Track
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("cart")}
        >

          <Text style={styles.navText}>
            🛒
          </Text>

          <Text style={styles.navText}>
            Cart
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("profile")}
        >

          <Text style={styles.navText}>
            👤
          </Text>

          <Text style={styles.navText}>
            Profile
          </Text>

        </TouchableOpacity>

        </View>

      </ScrollView>

    </SafeAreaView>

  );

}


//--Cart Screen --//

if (screen === "cart") {

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity onPress={() => setScreen("home")}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Your Cart</Text>

      </View>

      <ScrollView>

        {cart.map((item, index: number) => (

          <View key={index} style={styles.cartItem}>

            <Text style={styles.cartItemText}>{item.name}</Text>
            <Text>R{item.price}</Text>

          </View>

        ))}

        <Text style={styles.discountTitle}>Discounts</Text>

        <View style={styles.discountBox}>
          <Text>Discount Available</Text>
        </View>

      </ScrollView>

      <View style={styles.cartFooter}>

        <View style={styles.totalBox}>
          <Text>Total</Text>
          <Text>R{cart.length * 60}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => setScreen("checkout")}
        >
          <Text style={styles.buttonText}>Go to checkout</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.bottomNavigation}>

        <TouchableOpacity style={styles.navButton} onPress={() => setScreen("home")}>
          <Text style={styles.navText}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => setScreen("tracking")}>
          <Text style={styles.navText}>📍</Text>
          <Text style={styles.navText}>Track</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => setScreen("cart")}>
          <Text style={styles.navText}>🛒</Text>
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => setScreen("profile")}>
          <Text style={styles.navText}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>

  );

}


//--Checkout screen --//

if (screen === "checkout") {

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() =>
            setScreen("cart")
          }>

            <Text style={styles.backButton}>
              ←
            </Text>

          </TouchableOpacity>


          <Text style={styles.headerTitle}>
            Checkout
          </Text>

          <View />

      </View>


      <ScrollView
        contentContainerStyle={styles.checkoutContainer}>


          <Text style={styles.orderId}>
            Order Id: #####
          </Text>

           
<View style={{
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  padding: 15,
  marginBottom: 15,
  borderWidth: 1,
  borderColor: "#CCCCCC",
}}>

  <Text style={{
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  }}>
    Your Order
  </Text>

  {cart.length > 0 ? (

    cart.map((item, index) => (

      <View
        key={`${item.id}-${index}`}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#EEEEEE",
        }}
      >

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16 }}>
            {item.emoji} {item.name}
          </Text>
        </View>

        <Text style={{
          fontSize: 16,
          fontWeight: "bold",
        }}>
          R{item.price.toFixed(2)}
        </Text>

      </View>

    ))

  ) : (

    <Text>Your cart is currently empty.</Text>

  )}

</View>

          <View style={styles.checkoutBox}>

            <Text>
              Discount
            </Text>

          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() =>
              setScreen("payment")
            }>

              <Text style={styles.buttonText}>
                Confirm Order
              </Text>

          </TouchableOpacity>

              {/* Bottom Navigation */}

      <View style={styles.bottomNavigation}>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("home")}
        >

          <Text style={styles.navText}>
            🏠
          </Text>

          <Text style={styles.navText}>
            Home
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("tracking")}
        >

          <Text style={styles.navText}>
            📍
          </Text>

          <Text style={styles.navText}>
            Track
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("cart")}
        >

          <Text style={styles.navText}>
            🛒
          </Text>

          <Text style={styles.navText}>
            Cart
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("profile")}
        >

          <Text style={styles.navText}>
            👤
          </Text>

          <Text style={styles.navText}>
            Profile
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>

  </SafeAreaView>

  );
}


//--Payment method screen --//

      if (screen === "payment") {

  return (

    <SafeAreaView style={[styles.container, { flex: 1 }]}>

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() =>
            setScreen("checkout")
          }>

            <Text style={styles.backButton}>
              ←
            </Text>

          </TouchableOpacity>


          <Text style={styles.headerTitle}>
            Paymeny
          </Text>

          <View />

      </View>

      {/* Scrollable Payment Content */}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.paymentContainer}>

          <Text style={styles.title}>
            Select Payment Method
          </Text>

          {/* Card Payment */}

          <TouchableOpacity
            style={[
              styles.paymentButton,
              {
                backgroundColor:
                  paymentMethod === "Card" ? "#DCEBFF" : "#FFFFFF",
                borderWidth: paymentMethod === "Card" ? 2 : 1,
                borderColor:
                  paymentMethod === "Card" ? "#1565C0" : "#CCCCCC",
              },
            ]}
            onPress={() => setPaymentMethod("Card")}
          >
            <Text>💳 Card</Text>
          </TouchableOpacity>

          {/* PayPal Payment */}

          <TouchableOpacity
            style={[
              styles.paymentButton,
              {
                backgroundColor:
                  paymentMethod === "PayPal" ? "#DCEBFF" : "#FFFFFF",
                borderWidth: paymentMethod === "PayPal" ? 2 : 1,
                borderColor:
                  paymentMethod === "PayPal" ? "#1565C0" : "#CCCCCC",
              },
            ]}
            onPress={() => setPaymentMethod("PayPal")}
          >
            <Text>PayPal</Text>
          </TouchableOpacity>

          {/* Card Details */}

          {paymentMethod === "Card" && (

            <View>

              <Text style={styles.paymentLabel}>
                Select Card
              </Text>

              <View style={styles.cardBox}>

                {["Visa", "Mastercard", "Other"].map((type) => (

                  <TouchableOpacity
                    key={type}
                    onPress={() => setCardType(type)}
                    style={{
                      padding: 10,
                      backgroundColor:
                        cardType === type ? "#DCEBFF" : "#FFFFFF",
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor:
                        cardType === type ? "#1565C0" : "#CCCCCC",
                    }}
                  >
                    <Text>{type}</Text>
                  </TouchableOpacity>

                ))}

              </View>

              <TextInput
                style={styles.input}
                placeholder="Name on card"
                value={cardName}
                onChangeText={setCardName}
              />

              <TextInput
                style={styles.input}
                placeholder="Card Number"
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
                maxLength={19}
              />

              <View style={styles.cardInputRow}>

                <TextInput
                  style={styles.smallInput}
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChangeText={setExpiryDate}
                  keyboardType="numeric"
                  maxLength={5}
                />

                <TextInput
                  style={styles.smallInput}
                  placeholder="CVV"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                  secureTextEntry
                  maxLength={4}
                />

              </View>

            </View>

          )}

          {/* PayPal Information */}

          {paymentMethod === "PayPal" && (

            <View style={styles.cardBox}>
              <Text>
                PayPal selected.
              </Text>
              <Text>
                PayPal payment integration is not connected yet.
              </Text>
            </View>

          )}

          {/* Place Order */}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {

              if (paymentMethod === "Card") {

                if (
                  cardName.trim() === "" ||
                  cardNumber.trim() === "" ||
                  expiryDate.trim() === "" ||
                  cvv.trim() === ""
                ) {
                  Alert.alert(
                    "Missing Information",
                    "Please complete all card details."
                  );
                  return;
                }

              }

              Alert.alert(
                "Order Confirmation",
                "Your demo order is ready to be confirmed.",
                [
                  {
                    text: "Continue",
                    onPress: () => setScreen("confirmation"),
                  },
                ]
              );

            }}
          >
            <Text style={styles.buttonText}
            onPress={() => setScreen("confirmation")}>
              Place Order
            </Text>
          </TouchableOpacity>

        </View>


         {/* Bottom Navigation */}

      <View style={styles.bottomNavigation}>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("home")}
        >

          <Text style={styles.navText}>
            🏠
          </Text>

          <Text style={styles.navText}>
            Home
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("tracking")}
        >

          <Text style={styles.navText}>
            📍
          </Text>

          <Text style={styles.navText}>
            Track
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("cart")}
        >

          <Text style={styles.navText}>
            🛒
          </Text>

          <Text style={styles.navText}>
            Cart
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("profile")}
        >

          <Text style={styles.navText}>
            👤
          </Text>

          <Text style={styles.navText}>
            Profile
          </Text>

        </TouchableOpacity>

      </View>

      </ScrollView>

    </SafeAreaView>

  );

}


//--Order Confirmation screen --//

if (screen === "confirmation") {

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >

       <View style={styles.header}>

        <TouchableOpacity
        onPress={() =>
          setScreen("home")
        }>

          <Text style={styles.backButton}>
            ←
          </Text>

        </TouchableOpacity>

      </View>

      <View style={styles.confirmationContainer}>

        <Text style={styles.confirmationTitle}>
           ✓ Order Confirmed!
        </Text>


        <Text style={styles.finalPrice}>
          Final Price
        </Text>

        <Text style={styles.price}>
          R{cart.length * 60}
        </Text>

        <View style={styles.confirmationBox}>

          <Text>
            User's Order
          </Text>

        </View>

        <View style={styles.confirmationBox}>

          <Text>
            Delivery Address
          </Text>

        </View>

        <View style={styles.confirmationBox}>

          <Text>
            Payment Information
          </Text>

        </View>

        <TouchableOpacity
        style={styles.loginButton}
        onPress={() =>
          setScreen("tracking")
        }>

          <Text style={styles.buttonText}>
            Track Your Order
          </Text>

        </TouchableOpacity>

      </View>

      </ScrollView>

    </SafeAreaView>

  );

}


//--Order Tracking Screen --//

if (screen === "tracking") {

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >

      <View style={styles.header}>

        <TouchableOpacity
        onPress={() =>
          setScreen("home")
        }>

          <Text style={styles.backButton}>
            ←
          </Text>

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Track Your Order
        </Text>

        <View />

      </View>

      <View style={styles.mapBox}>

        <Text style={styles.mapEmoji}>
          🗺️
        </Text>

        <Text>
          Map used to display route and estimated arrival
        </Text>

      </View>


      <View style={styles.userInfoBox}>

        <Text style={styles.detailsTitle}>
          Delivery Information
        </Text>

        <Text>
          Driver: Dylan{"\n\n"}
          Estimated arrival: 25 minutes{"\n\n"}
          Status: On the way
        </Text>

        {/* Bottom Navigation */}

      <View style={styles.bottomNavigation}>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("home")}
        >

          <Text style={styles.navText}>
            🏠
          </Text>

          <Text style={styles.navText}>
            Home
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("tracking")}
        >

          <Text style={styles.navText}>
            📍
          </Text>

          <Text style={styles.navText}>
            Track
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("cart")}
        >

          <Text style={styles.navText}>
            🛒
          </Text>

          <Text style={styles.navText}>
            Cart
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("profile")}
        >

          <Text style={styles.navText}>
            👤
          </Text>

          <Text style={styles.navText}>
            Profile
          </Text>

        </TouchableOpacity>

      </View>

      </View>

      </ScrollView>

    </SafeAreaView>

  );

}


//--Reservation screen --//

if (screen === "reservation") {

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >

          <View style={styles.header}>

          <TouchableOpacity
          onPress={() =>
            setScreen("home")
          }>

            <Text style={styles.backButton}>
              ←
            </Text>

          </TouchableOpacity>


          <Text style={styles.headerTitle}>
              Make A Reservation
          </Text>

          </View>

          <View />

          <TextInput
          style={styles.input}
          placeholder="Number of people"
          keyboardType="numeric"
          value={guests}
          onChangeText={setGuests}
          />

          <TextInput
          style={styles.input}
          placeholder="Date"
          value={date}
          onChangeText={setDate}
          />

          <TextInput
          style={styles.input}
          placeholder="Time"
          value={time}
          onChangeText={setTime}
          />

          <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          />

          <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={reservationEmail}
          onChangeText={setReservationEmail}
          />

          <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          />

          <TextInput
          style={[
            styles.input,
            styles.requestInput,
          ]}
          placeholder="Add a request (Optional)"
          multiline
          />

          <TouchableOpacity
          style={styles.loginButton}
          onPress={() =>{

            if (
              guests === "" ||
              date === "" ||
              time === "" ||
              name === "" ||
              reservationEmail === ""
            ) {

              Alert.alert(
                "Missing Information",
                "Please complete all required fields."
              );

            } else {

              setScreen(
                "reservationConfirmation"
              );

            }

          }}>

            <Text style={styles.buttonText}>
              Book a Table
            </Text>

          </TouchableOpacity>

        </ScrollView>

 {/* Bottom Navigation */}

      <View style={styles.bottomNavigation}>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("home")}
        >

          <Text style={styles.navText}>
            🏠
          </Text>

          <Text style={styles.navText}>
            Home
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("tracking")}
        >

          <Text style={styles.navText}>
            📍
          </Text>

          <Text style={styles.navText}>
            Track
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("cart")}
        >

          <Text style={styles.navText}>
            🛒
          </Text>

          <Text style={styles.navText}>
            Cart
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("profile")}
        >

          <Text style={styles.navText}>
            👤
          </Text>

          <Text style={styles.navText}>
            Profile
          </Text>

        </TouchableOpacity>

      </View>

    </SafeAreaView>

  );

}


//--Reservation confirmation Screen--//

if (screen === "reservationConfirmation") {

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >

      <View style={styles.confirmationContainer}>

        <Text style={styles.confirmationContainer}>
          Your Reservation is Confirmed!
        </Text>

        <View style={styles.reservationInfo}>

          <Text>
            Date
          </Text>

          <Text style={styles.infoValue}>
            {date}
          </Text>

          <Text>
            Time
          </Text>

          <Text>
            {time}
          </Text>


          <Text>
            {guests}
          </Text>

          <Text>
            Name
          </Text>

          <Text style={styles.infoValue}>
            {name}
          </Text>

          <Text>
            Status
          </Text>

          <Text style={styles.infoValue}>
            Confirmed
          </Text>

        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => 
            setScreen("home")
          }>

            <Text style={styles.buttonText}>
              Ok
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
          style={styles.cancelButton}
          onPress={() =>
            setScreen("reservation")
          }>

            <Text>
              Cancel
            </Text>

          </TouchableOpacity>

      </View>

      </ScrollView>

    </SafeAreaView>

  );

}


//--Chef menu screen --//

if (screen === "chefMenu") {

  return (

    <SafeAreaView style={styles.container}>

      {/* Header */}

      <View style={styles.header}>

        <TouchableOpacity
        onPress={() => 
           setScreen("home")
        }>

          <Text style={styles.backButton}>
             ←
          </Text>

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Chef Menu
        </Text>

      </View>
      
      <ScrollView
         contentContainerStyle={styles.chefContainer}>


          {/* Title */}

          <Text style={styles.title}>
           {editingItemId !== null ? "Edit Menu Item" : "Add Menu Item"}
          </Text>

          <Text style={styles.subtitle}>
            Enter dish details.
          </Text>

          {/* Menu Stats */}

          <Text style={styles.menuListTitle}>
            Menu Statistics
          </Text>

          <View style={{
            backgroundColor: "#FFFFFFF",
            padding: 15,
            borderRadius: 112,
            marginBottom: 20,
            elevation: 3,
          }}>

          {/* Total Items */}

          <View style={{
            backgroundColor: "#E8F5E9",
            padding: 15,
            borderRadius: 10,
            marginBottom: 10,
          }}>
          <Text style={{
            color: "#287A45",
            fontSize: 14,
          }}>
          Total Menu Items
          </Text>

          <Text style={{
            fontSize: 26,
            fontWeight: "bold",
            color: "#287A45",
          }}>
            {totalMenuItems}
            </Text>
            </View>


          {/* Average Price */}

          <View style={{
            backgroundColor: "#E3F2FD",
            padding: 15,
            borderRadius: 10,
            marginBottom: 10,
          }}>

          <Text style={{
            color: "#1565C0",
            fontSize: 14,
          }}>
          Average Menu Price
          </Text>

          <Text style={{
            fontSize: 26,
            fontWeight: "bold",
            color: "1565C0",
          }}>
          R{averagePrice.toFixed(2)}
          </Text>
          </View>

          {/* Course Counts */}

          <Text style={{
            fontSize: 17,
            fontWeight: "bold",
            marginTop: 8,
            marginBottom: 10,
          }}>
           Items Per Course
           </Text>

           <View style={styles.courseStatRow}>
            <Text style={styles.courseStatLabel}>🥗 Starters</Text>
            <Text style={styles.courseStatNumber}>{starterCount}</Text>
            </View>

           <View style={styles.courseStatRow}>
            <Text style={styles.courseStatLabel}>🍔 Main Courses</Text>
            <Text style={styles.courseStatNumber}>{mainCount}</Text>
            </View>

            <View style={styles.courseStatRow}>
            <Text style={styles.courseStatLabel}>🍰 Desserts</Text>
            <Text style={styles.courseStatNumber}>{dessertCount}</Text>
            </View>

          </View>

          <TextInput
           placeholder="Enter category (e.g. Burgers)"
           value={dishCategory}
           onChangeText={setDishCategory}
           style={styles.input}
           />

          {/* Error Message */}

          {errorMessage !== "" && (

            <View style={styles.errorBox}>

              <Text style={styles.errorText}>
                {errorMessage}
              </Text>

            </View>

          )}

          {/* Dish Name */}

          <Text style={styles.label}>
            Dish Name
          </Text>

          <TextInput
             style={styles.input}
             placeholder="Enter dish name"
             value={dishName}
             onChangeText={setDishName}
             />

             {/* Description */}

             <Text style={styles.label}>
              Description
             </Text>

             <TextInput
             style={[
              styles.input,
              styles.descriptionInput
             ]}
             placeholder="Enter dish description"
             multiline={true}
             value={description}
             onChangeText={setDescription}
             />

             {/* Course */}

             <Text style={styles.label}>
              Course
             </Text>

             <View style={styles.courseContainer}>

              <TouchableOpacity
              style={[
                styles.courseButton,

                course === "Starter"
                ? styles.selectedCourse
                : null
              ]}
              onPress={() => 
                setCourse("Starter")
              }>

                <Text>
                  Starter
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
              style={[
                styles.courseButton,

                course === "Main"
                ? styles.selectedCourse
                : null
              ]}
              onPress={() =>
                setCourse("Main")
              }>

                <Text>
                  Main
                </Text>

              </TouchableOpacity>

               <TouchableOpacity
              style={[
                styles.courseButton,

                course === "Dessert"
                ? styles.selectedCourse
                : null
              ]}
              onPress={() =>
                setCourse("Dessert")
              }>

                <Text>
                  Dessert
                </Text>

              </TouchableOpacity>

             </View>


             {/* Price */}

             <Text style={styles.label}>
              Price
             </Text>

             <TextInput
               style={styles.input}
               placeholder="Enter price"
               keyboardType="numeric"
               value={price}
               onChangeText={setPrice}
               />

               {/* Add Menu Items Button */}

               <TouchableOpacity
               style={styles.loginButton}
               onPress={addMenuItem}>

                <Text style={styles.buttonText}>
                  {editingItemId !== null ? "Save Changes" : "Add Menu Item"}
                </Text>
               </TouchableOpacity>

               {editingItemId !== null && (
              
               <TouchableOpacity
                style={[styles.loginButton, {
                backgroundColor: "#777" }]}
                onPress={() => {
                setDishName("");
                setDescription("");
                setCourse("");
                setPrice("");
                setEditingItemId(null);
                setErrorMessage("");
                 }}
                   >
               <Text style={styles.buttonText}>
                Cancel Editing
               </Text>
               </TouchableOpacity>
                 )}

               {/* Menu List */}

               <Text style={styles.menuListTitle}>
                Menu Items
               </Text>

                {/* No Items Message */}

                {menuItems.length === 0 ? (

                  <View style={styles.emptyMenu}>

                    <Text style={styles.emptyMenuText}>
                      No menu items have been added yet.
                    </Text>

                    <Text style={styles.emptyMenuSubtext}>
                      Add your first dish using the form above.
                    </Text>

                  </View>

                ) : (


                  //Display all menu items

                  menuItems.map((item) => (

                    <View
                    key={item.id}
                    style={styles.menuItemCard}>


                      <View style={styles.menuItemHeader}>

                        <Text style={styles.menuDishName}>
                          {item.name}
                        </Text>

                        <Text style={styles.menuPrice}>
                          R{item.price}
                        </Text>

                      </View>


                      <Text style={styles.courseText}>
                        {item.course}
                      </Text>

                      <Text style={styles.menuDescription}>
                        {item.description}
                      </Text>

                      
                      <View
                       style={{
                       flexDirection: "row",
                       justifyContent: "space-between",
                       marginTop: 15,
                       gap: 12,
                       }}
                       >

                       {/* EDIT BUTTON */}

                     <TouchableOpacity
                     onPress={() => editMenuItem(item)}
                       style={{
                       backgroundColor: "#287A45",
                       padding: 12,
                       borderRadius: 8,
                       flex: 1,
                       alignItems: "center",
                      }}
                      >

                    <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                     ✏️ Edit
                     </Text>
                   </TouchableOpacity>

                     {/* DELETE BUTTON */}

                   <TouchableOpacity
                   onPress={() => { 
                   deleteMenuItem(item.id)}}
                     style={{
                    backgroundColor: "#D32F2F",
                     padding: 12,
                     borderRadius: 8,
                     flex: 1,
                     alignItems: "center",
                     }}
                      >
                   <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                     🗑️ Delete
                   </Text>

                  </TouchableOpacity>

                   </View>

                    </View>

                  ))
                
                )}

         </ScrollView>

    </SafeAreaView>
      
  );

}


//--Profile screen --//

if (screen === "profile") {

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView>

        {/* Header */}

        <View style={styles.profileHeader}>

            <TouchableOpacity
          onPress={() =>
            setScreen("home")
          }>

            <Text style={styles.backButton}>
              ←
            </Text>

          </TouchableOpacity>

          <Text style={styles.profileTitle}>
            My Profile
          </Text>

        </View>

        {/* User Information */}

        <View style={styles.profileInfo}>

          {/* Profile Image */}

          <View style={styles.profileImagePlaceholder}>


            <Text style={styles.profileEmoji}>
              👩
            </Text>

          </View>

          {/* User Details */}

          <View style={styles.userDetails}>

            <Text style={styles.userName}>
              {userName}
            </Text>


            <Text style={styles.userEmail}>
              {userEmail}
            </Text>

          </View>

        </View>

        {/* Edit Profile Button */}

        <TouchableOpacity
  style={styles.editProfileButton}
  onPress={() => {
  setEditName(userName);
  setEditEmail(userEmail);
  setShowEditProfile(!showEditProfile);
}}
>
  <Text style={styles.editProfileText}>
    {showEditProfile ? "Close Edit Profile ▲" : "✏️ Edit Profile ▼"}
  </Text>
</TouchableOpacity>

{/* EDIT PROFILE FORM - VERTICAL LAYOUT */}
{showEditProfile && (
  <View style={styles.profileEditForm}>

    <Text style={styles.profileSectionTitle}>
      Update Personal Details
    </Text>

    <Text style={styles.profileFieldLabel}>Full Name</Text>

    <TextInput
      style={styles.profileField}
      value={editName}
      onChangeText={setEditName}
      placeholder="Enter your name"
    />

    <Text style={styles.profileFieldLabel}>Email Address</Text>

    <TextInput
      style={styles.profileField}
      value={editEmail}
      onChangeText={setEditEmail}
      placeholder="Enter your email"
      keyboardType="email-address"
      autoCapitalize="none"
    />

    <TouchableOpacity
      style={styles.saveProfileButton}
      onPress={() => {
        if (!editName.trim() || !editEmail.trim()) {
          Alert.alert("Missing Details", "Please enter your name and email.");
          return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editEmail.trim())) {
          Alert.alert("Invalid Email", "Please enter a valid email address.");
          return;
        }

        setUserName(editName.trim());
        setUserEmail(editEmail.trim());
        setShowEditProfile(false);

        Alert.alert("Success", "Your profile has been updated.");
      }}
    >
      <Text style={styles.buttonText}>Save Changes</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.paymentButton}
      onPress={() => {
        setIsEditingProfile(false);
      }}
    >
      <Text>Cancel</Text>
    </TouchableOpacity>

  </View>
)}

        {/* PROFILE MENU */}

        <View style={styles.profileMenu}>

          {/* PAYMENT */}

<TouchableOpacity
  style={styles.profileMenuItem}
  onPress={() => setShowPayment(!showPayment)}
>
  <Text style={styles.profileMenuIcon}>💳</Text>

  <Text style={styles.profileMenuText}>
    Payment
  </Text>

  <Text style={styles.dropdownArrow}>
    {showPayment ? "▲" : "▼"}
  </Text>
</TouchableOpacity>

{showPayment && (
  <View style={styles.profileDropdown}>

    <Text style={styles.profileSectionTitle}>
      Preferred Payment Method
    </Text>

    <TouchableOpacity
      style={styles.paymentOption}
      onPress={() => setPaymentMethod("Card")}
    >
      <Text>💳  Bank Card</Text>
      <Text>
        {paymentMethod === "Card" ? "✓ Selected" : "Select"}
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.paymentOption}
      onPress={() => setPaymentMethod("PayPal")}
    >
      <Text>PayPal</Text>
      <Text>
        {paymentMethod === "PayPal" ? "✓ Selected" : "Select"}
      </Text>
    </TouchableOpacity>

    <Text style={styles.savedAddress}>
      Preferred method: {paymentMethod}
    </Text>

    <Text style={styles.paymentNote}>
      This is a saved preference for your app demonstration.
      No payment details are stored or processed here.
    </Text>

  </View>
)}


          {/* Location */}

<TouchableOpacity
  style={styles.profileMenuItem}
  onPress={() => {
  setEditLocation(profileLocation);
  setShowLocation(!showLocation);
}}>
  <Text style={styles.profileMenuIcon}>📍</Text>

  <Text style={styles.profileMenuText}>
    My Location
  </Text>

  <Text style={styles.dropdownArrow}>
    {showLocation ? "▲" : "▼"}
  </Text>
</TouchableOpacity>

{showLocation && (
  <View style={styles.profileDropdown}>

    <Text style={styles.profileFieldLabel}>
      Delivery Address
    </Text>

    <TextInput
      style={styles.profileField}
      placeholder="Enter your delivery address"
      value={editLocation}
      onChangeText={setEditLocation}
      multiline
    />

    <TouchableOpacity
      style={styles.saveProfileButton}
      onPress={() => {
        if (editLocation.trim() === "") {
          Alert.alert(
            "Missing Address",
            "Please enter your delivery address."
          );
          return;
        }

        setProfileLocation(editLocation.trim());

        Alert.alert(
          "Location Saved",
          "Your delivery address has been updated."
        );

        setShowLocation(false);
      }}
    >
      <Text style={styles.buttonText}>Save Address</Text>
    </TouchableOpacity>

    {profileLocation !== "" && (
      <Text style={styles.savedAddress}>
        Saved address: {profileLocation}
      </Text>
    )}

  </View>
)}


          {/* Notifications */}
          
<TouchableOpacity
  style={styles.profileMenuItem}
  onPress={() => {
    setNotificationsEnabled(!notificationsEnabled);

    Alert.alert(
      "Notifications",
      notificationsEnabled
        ? "Notifications have been turned off."
        : "Notifications have been turned on."
    );
  }}
>
  <Text style={styles.profileMenuIcon}>🔔</Text>

  <Text style={styles.profileMenuText}>
    Notifications: {notificationsEnabled ? "ON" : "OFF"}
  </Text>
</TouchableOpacity>



          {/* ABOUT */}

          <TouchableOpacity
            style={styles.profileMenuItem}
            onPress={() =>
              Alert.alert(
                "About App",
                "Restaurant Ordering Application"
              )
            }
          >

            <Text style={styles.profileMenuIcon}>
              ℹ️
            </Text>

            <Text style={styles.profileMenuText}>
              About App
            </Text>

          </TouchableOpacity>


          {/* LOG OUT */}

          <TouchableOpacity
            style={styles.profileMenuItem}
            onPress={() => {

              Alert.alert(

                "Log Out",

                "Are you sure you want to log out?",

                [

                  {
                    text: "Cancel",
                    style: "cancel",
                  },

                  {
                    text: "Log Out",

                    onPress: () =>
                      setScreen("login"),

                  },

                ]

              );

            }}
          >

            <Text style={styles.profileMenuIcon}>
              🚪
            </Text>

            <Text style={styles.profileMenuText}>
              Log Out
            </Text>

          </TouchableOpacity>


        </View>


      </ScrollView>


      {/* Bottom Navigation */}

      <View style={styles.bottomNavigation}>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("home")}
        >

          <Text style={styles.navText}>
            🏠
          </Text>

          <Text style={styles.navText}>
            Home
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("tracking")}
        >

          <Text style={styles.navText}>
            📍
          </Text>

          <Text style={styles.navText}>
            Track
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("cart")}
        >

          <Text style={styles.navText}>
            🛒
          </Text>

          <Text style={styles.navText}>
            Cart
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setScreen("profile")}
        >

          <Text style={styles.navText}>
            👤
          </Text>

          <Text style={styles.navText}>
            Profile
          </Text>

        </TouchableOpacity>


      </View>

    </SafeAreaView>

  );

}

 return null;

}

//--Styles --//

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:"#F7F7F7",
  },

  splashContainer: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
    alignItems: "center",
  },

  splashContent: {
    alignItems: "center",
  },

  logoText: {
    fontSize: 90,
  },

  appName: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 15,
  },

  splashDescription: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 30,
  },

  startButton: {
    backgroundColor: "#333",
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 8,
  },

  loginContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },

  logo: {
    fontSize: 60,
    textAlign: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },

  loginButton: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  linkText: {
    textAlign: "center",
    marginTop: 20,
    color: "#333",
  },

  header: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: "#DDDDDD",
    zIndex: 100,
    elevation: 10,
  },

  menuButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 42,
    height: 42,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    backgroundColor: "#FFFFFF",
  },

  menuIcon: {
    fontSize: 24,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  toggleMenu: {
    position: "absolute",
    top: 58,
    left: 15,
    width: 230,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    zIndex: 999,
    elevation: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.02,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4,},
  },

  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  menuText: {
    fontSize: 15,
    color: "#333333",
  },

  menuItemText: {
    fontSize: 15,
    color: "#333333",
  },

  profile: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 7,
  },

  topProfileButton: {
  borderWidth: 1,
  borderColor: "#333333",
  borderRadius: 25,
  paddingVertical: 10,
  paddingHorizontal: 15,
},


topProfileText: {
  fontSize: 14,
},

  searchBar: {
    margin: 15,
    backgroundColor:"#FFFFFF",
    borderWidth: 10,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 5,
  },
   
  searchResultsContainer: {
    marginHorizontal: 15,
    marginTop: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },

  searchResultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 15,
  },

  noResultsText: {
    fontSize: 13,
    color: "#666666",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },

  searchResultCard: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    alignItems: "center",
  },

  searchEmoji: {
    fontSize: 18,
    marginRight: 12,
  },

  searchInfo: {
    flex: 1,
  },

  searchFoodName: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 4,
  },

  searchFoodDescription: {
    fontSize: 13,
    color: "#666666",
    marginBottom: 4,
  },

  searchFoodPrice: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333333",
  },

  promotion: {
    margin: 15,
    padding: 25,
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
    alignItems: "center",
  },

  promotionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 15,
  },

  category: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    alignItems: "center",
    minWidth: 80,
  },

  categoryText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
  },

  categoryButton: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    alignItems: "center",
    minWidth: 80,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  seeAll: {
    marginRight: 15,
  },

  foodScrollContainer: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 20,
    gap: 12,
  },

  foodListContainer: {
    padding: 20,
    justifyContent: "space-between",
  },

  foodListCard: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },

  foodListEmoji: {
    fontSize: 50,
    marginRight: 15,
  },

  foodListInfo: {
    flex: 1,
  },

  foodListName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  foodListDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },

  foodListPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },

  foodRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },

  foodImage: {
    fontSize: 60,
  },

  foodPrice: {
    fontWeight: "bold",
    color: "#333333",
  },

  foodName: {
    fontWeight: "bold",
    marginVertical: 8,
  },

  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#DDDDDD",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#DDDDDD",
  },

  navButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 8,
  },

  navText: {
    fontSize: 12,
    color: "#333333",
    marginTop: 2,
  },

  popularHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
  },

  seeAllText: {
    fontSize: 16,
    color: "#444",
  },

  foodDetailsContainer: {
    padding: 20,
    paddingBottom: 40,
  },

  detailsEmoji: {
    fontSize: 100,
    textAlign: "center",
    marginVertical: 20,
  },

  detailsFoodName: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },

  detailsPrice: {
    fontSize: 22,
    textAlign: "center",
    marginVertical: 10,
  },

  detailsSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },

  detailsBox: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },

  detailsText: {
    fontSize: 16,
    lineHeight: 22,
  },

foodNavigation: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 25,
},

previousButton: {
  padding: 12,
  borderWidth: 1,
  borderColor: "#444",
  borderRadius: 8,
},

nextButton: {
  padding: 12,
  borderWidth: 1,
  borderColor: "#444",
  borderRadius: 8,
},

navigationText: {
  fontSize: 16,
},

  backButton: {
    fontSize: 28,
  },

  foodImageLarge: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },

  largeEmoji: {
    fontSize: 130,
  },

  carousel: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },

  foodCard: {
  width: 280,
  backgroundColor: "#FFFFFF",
  borderRadius: 20,
  padding: 20,
  marginRight: 20,
  gap: 8,
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#DDDDDD",
},

  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  addButton: {
    backgroundColor: "#333",
    padding: 15,
    margin: 15,
    borderRadius: 8,
    alignItems: "center",
  },

  cartrItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    margin: 10,
    padding: 20,
    borderRadius: 10,
  },

  cartItemText: {
    fontSize: 16,
  },

  discountTitle: {
    fontWeight: "bold",
    margin: 15,
  },

  discountBox: {
    backgroundColor: "#FFFFFF",
    margin: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },

  cartFooter: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-between",
  },

  totalBox: {
    alignItems: "center",
  },

  checkoutButton: {
    backgroundColor: "#333",
    padding: 14,
    borderRadius: 8,
  },

  checkoutContainer: {
    padding: 25,
  },

  orderId: {
    textAlign: "center",
    marginBottom: 20,
  },

  checkoutBox: {
    backgroundColor: "#FFFFFF",
    padding: 25,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    alignItems: "center",
  },

  paymentContainer: {
    padding: 25,
  },

  paymentButton: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    alignItems: "center",
  },

  paymentLabel: {
    textAlign: "center",
    margin: 15,
  },
  cardBox: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginBottom: 15,
    alignItems: "center",
  },

  cardInputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  smallInput: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },

  confirmationContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },

  confirmationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },

  finalPrice: {
    textAlign: "center",
  },

  price: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
  },

  confirmationBox: {
    backgroundColor: "#FFFFFF",
    padding: 25,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    alignItems: "center",
  },

  mapBox: {
    height: 350,
    margin: 15,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 10,
  },

  mapEmoji: {
    fontSize: 70,
    marginBottom: 15,
  },

  userInfoBox: {
    backgroundColor: "#FFFFFF",
    margin: 15,
    padding: 25,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
  },

  reservationContainer: {
    padding: 25,
  },

  requestInput: {
    height: 100,
    textAlignVertical: "top",
  },

  reservationInfo: {
    marginBottom: 25,
  },

  infoValue: {
    borderBottomWidth: 1,
    borderColor: "#CCCCCC",
    paddingVertical: 8,
    marginBottom: 15,
  },

  cancelButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },


  //--Category screen styles --//

  categoryScreenTitle: {
  fontSize: 26,
  fontWeight: "bold",
  marginHorizontal: 20,
  marginTop: 20,
  marginBottom: 15,
},

categoryFoodContainer: {
  padding: 20,
  paddingBottom: 100,
},

categoryFoodCard: {
  flexDirection: "row",
  backgroundColor: "#FFFFFF",
  borderRadius: 15,
  padding: 15,
  marginBottom: 15,
  borderWidth: 1,
  borderColor: "#DDDDDD",
},

categoryFoodEmoji: {
  fontSize: 15,
  marginRight: 15,
},

categoryFoodInfo: {
  flex: 1,
  justifyContent: "center",
},

categoryFoodName: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 5,
},

categoryFoodDescription: {
  fontSize: 14,
  color: "#666666",
  marginBottom: 8,
},

categoryFoodPrice: {
  fontSize: 17,
  fontWeight: "bold",
},

emptyContainer: {
  alignItems: "center",
  marginTop: 50,
},

emptyText: {
  fontSize: 16,
  color: "#777777",
},

  
//--Profile screen styles --//

profileHeader: {
  paddingHorizontal: 25,
  paddingTop: 30,
  paddingBottom: 15,
},

profileTitle: {
  fontSize: 28,
  fontWeight: "bold",
  color: "#E85C5C",
},

profileInfo: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 25,
  marginTop: 10,
},

profileImagePlaceholder: {
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: "#EEEEEE",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 15,
},


profileEmoji: {
  fontSize: 45,
},

userDetails: {
  flex: 1,
},

userName: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#333333",
},

userEmail: {
  fontSize: 13,
  color: "#777777",
  marginTop: 5,
},

editProfileButton: {
  backgroundColor: "#E85C5C",
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  alignSelf: "center",
  marginTop: 20,
  marginBottom: 25,
},

editProfileText: {
  color: "#FFFFFF",
  fontWeight: "bold",
},

profileMenu: {
  marginHorizontal: 25,
  backgroundColor: "#FFFFFF",
  borderRadius: 15,
  paddingVertical: 5,
  borderWidth: 1,
  borderColor: "#EEEEEE",
},

profileMenuItem: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 17,
  paddingHorizontal: 18,
  borderBottomWidth: 1,
  borderBottomColor: "#EEEEEE",
},

profileMenuIcon: {
  fontSize: 20,
  width: 40,
},

profileMenuText: {
  fontSize: 16,
  color: "#555555",
},


//--Chef menu styles --//

  chefContainer: {
    padding: 20,
    paddingBottom: 50,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 10,
  },

  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },

  errorBox: {
    backgroundColor: "#FFE5E5",
    borderWidth: 1,
    borderColor: "#CC0000",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },

  errorText: {
    color: "#CC0000",
    textAlign: "center",
  },

  courseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  courseButton: {
    width: "30%",
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    alignItems: "center",
  },

  selectedCourse: {
    backgroundColor: "#DDDDDD",
    borderColor:  "#333333",
  },

  menuListTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 35,
    marginBottom: 15,
  },

  emptyMenu: {
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },

  emptyMenuText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  emptyMenuSubtext: {
    fontSize: 14,
    color: "#777777",
    textAlign: "center",
  },

  menuItemCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },

  menuItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  menuDishName: {
    fontSize: 19,
    fontWeight: "bold",
  },

  menuPrice: {
    fontSize: 19,
    fontWeight: "bold",
  },

  courseText: {
    marginTop: 8,
    marginBottom: 8,
    fontWeight: "bold",
  },

  menuDescription: {
    color: "#555555",
    lineHeight: 20,
  },

  chefButton: {
    backgroundColor: "#333333",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    margin: 15,
  },
   
});